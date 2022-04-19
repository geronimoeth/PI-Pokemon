const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Pokemon, Types } = require('../db');

router.get('/', async (req, res, next) => {
    const { name } = req.query;

    if (name) { // It's query?? Ok, do this

        let getDb = await Pokemon.findOne({ // search the pokemon name in the DB 
            where: {
                name: name
            },
            include: Types
        });

        if (!getDb) { // No matches in the DB?? Ok, let's do the same in the API
            try {
                let getPokemonByApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

                let pokemon = {
                    img: getPokemonByApi.data.sprites.versions["generation-v"]["black-white"].animated["front_default"],
                    name: getPokemonByApi.data.name,
                    type: getPokemonByApi.data.types.map(element => element.type.name),
                    id: getPokemonByApi.data.id,
                    createdInDataBase: false,
                }

                return res.status(200).send(pokemon);
            } catch (error) {
                next(error);
            }
        } else {
            try {
                let pokemon = {
                    name: getDb.name,
                    img: getDb.img,
                    type: getDb.types.map(element => element.name),
                    id: getDb.id,
                    createdInDataBase: getDb.createdInDataBase,
                }
                res.send(pokemon);
            } catch (error) {
                next(error);
            }
        }

    } else { // NO query
        try {

        let apiPokemons = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');

        let dbPokemons = await Pokemon.findAll({
            include: Types
        });

        let principalRouteDbPokemons = dbPokemons.map(pokemon => { // get the DB pokemons
            return {
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types.map(element => element.name),
                img: pokemon.img,
                attack: pokemon.attack,
                createdInDataBase: pokemon.createdInDataBase, 
            }
        })

        let apiArr = [];
        let urls = []

        let howMany = 40 - principalRouteDbPokemons.length;

        for (let i = 0; i < howMany; i++) {

            let name = apiPokemons.data.results[i].name;
            let url = apiPokemons.data.results[i].url;
            let createdInDataBase = false;

            apiArr.push({ name, types: [], createdInDataBase });
            urls.push(axios.get(url));
        }

        let values = await Promise.all(urls);

        values.map((value, i) => {
            value.data.types.forEach((element, ind) => {
                
                apiArr[i].types.push(element.type.name);
            });

            apiArr[i].attack = value.data.stats[1].base_stat;
            apiArr[i].id = value.data.id;
            apiArr[i].img = value.data.sprites.versions["generation-v"]["black-white"].animated["front_default"];
        });

        let allData = [...apiArr, ...principalRouteDbPokemons];
        res.send(allData);
            
        } catch (error) {
            next(error);
        }
        
    }   
});

// /pokemon/1 ------> detalles de un pokemon particular

// /pokemon/1 ------> Datos de la ruta detalles 
// (img, name, types, id, hp, attack, defense, speed, height and weight)


// /pokemon/1 ------> Search in API and DB

// EN ESTA FALTA METER EL TYPES DE LOS QUE ESTÁN EN LA BASE DE DATOS
router.get('/:idPokemon', async (req, res, next) => {
    const { idPokemon } = req.params;

    if (idPokemon >= 1 && idPokemon <= 10228) {
        try {
            let getApiPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}/`);

            let pokemonTypes = getApiPokemon.data.types.map(element => {
                return (element.type.name);
            });
    
            let pokemon = {
                img: getApiPokemon.data.sprites.versions["generation-v"]["black-white"].animated["front_default"],
                name: getApiPokemon.data.name,
                types: pokemonTypes,
                id: idPokemon,
                hp: getApiPokemon.data.stats[0]["base_stat"],
                attack: getApiPokemon.data.stats[1]["base_stat"],
                defense: getApiPokemon.data.stats[2]["base_stat"],
                speed: getApiPokemon.data.stats[5]["base_stat"],
                height: getApiPokemon.data.height,
                weight: getApiPokemon.data.weight,
                createdInDataBase: false,
            }
            res.send(pokemon);
        } catch (error) {
            next(error);
        }

    } else {
        try {
            return Pokemon.findByPk(idPokemon, {
                include: Types
            }).then(pokemon => {
                res.send({
                    id: pokemon.id,
                    name: pokemon.name,
                    type: pokemon.types.map(element => element.name),
                    hp: pokemon.hp,
                    attack: pokemon.hp,
                    defense: pokemon.defense,
                    speed: pokemon.speed,
                    height: pokemon.height,
                    weight: pokemon.weight,
                    img: pokemon.img,
                    createdInDataBase: pokemon.createdInDataBase,
                });
            });
        } catch (error) {
            next(error);
        }
    }

}); 

//  /pokemons ----> ruta de creación
//  (img, name, types, id, hp, attack, defense, speed, height and weight)

router.post('/', async (req, res, next) => {
    //req.body

    try {
        const { id, name, types, hp, attack, defense, speed, height, weight, img } = req.body;
        const newPokemon = await Pokemon.create({
            id,
            name, 
            hp, 
            attack, 
            defense, 
            speed, 
            height, 
            weight, 
            img,
            createdInDataBase: true
        });

        await newPokemon.addTypes(types);
        res.status(201).json(newPokemon);

    } catch (error) {
        next(error);
    }
});

module.exports = router;
