const { Router } = require('express');
const { Types } = require('../db');
const router = Router();
const axios = require('axios');

//  Obtener todos los types posibles
//  Traer de la API guardarlos en la DB y trabajar con la DB. ?????

router.get('/', async (req, res, next) => {

    let myTypes = await Types.findAll();

    if (myTypes.length === 0) {
        try {
            let typesApi = await axios.get('https://pokeapi.co/api/v2/type');
        
            let names = typesApi.data.results.map(values => {
                return {
                    name: values.name
                }
            });
        
            let bulk = await Types.bulkCreate(names);
        
            bulk = bulk.map(type => {
                return {
                    id: type.id,
                    name: type.name,
                }
            })
            res.status(201).json(bulk);
        } catch (error) {
            next(error);
        }
    }

});

module.exports = router;
