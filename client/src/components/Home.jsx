import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, filterPokemonsByType, filterByDB, orderAlphabetic, orderAttack } from '../store/actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginate from './Paginate';
import styles from './Home.modules.css'

export default function Home() {
    
    const dispatch = useDispatch();

    const allPokemons = useSelector((state) => state.pokemons);
    const allTypes = useSelector((state) => state.types);

    console.log(allPokemons);
    const [sortAlp, setSortAlp] = useState(' ');
    const [sortAttack, setSortAttack] = useState(' ');
    const [currentPages, setCurrentPages] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const lastPokemon = currentPages * pokemonsPerPage;
    const firstPokemon = lastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(firstPokemon, lastPokemon);
    

    const paginate = (pageNumber) => {
        setCurrentPages(pageNumber);
    }

    useEffect(() => {
        dispatch(getTypes());
        dispatch(getPokemons());
    }, [])

    function handleClick(event) {
        event.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterType(event) {
        event.preventDefault();
        setCurrentPages(1);
        dispatch(filterPokemonsByType(event.target.value));
    }

    function handleFilterDB(event) {
        event.preventDefault();
        setCurrentPages(1);
        dispatch(filterByDB(event.target.value));
    }

    function handleSortedAlp(event) {
        event.preventDefault();
        dispatch(orderAlphabetic(event.target.value));
        setCurrentPages(1); // This only gonna render again if I am in a page different than 1
        setSortAlp(`Sorted ${event.target.value}`); // I need to set a new state to render my page again
    }

    function handleSortAttack(event) {
        event.preventDefault();
        dispatch(orderAttack(event.target.value));
        setCurrentPages(1);
        setSortAttack(`Sorted ${event.target.value}`);
    }

    return (
        <div className='hcontainer'>
            <div className='center'>

            <h1 className='htitle'>Pokemon PI</h1>
            <div className='createContainer'>
                <Link to={'/createPokemon'} className='create'>Create Pokemon</Link> 
            </div>
            <button className='refresh' onClick={event => {handleClick(event)}}> {/* Button for refresh*/}
                Refresh Pokemons
            </button>

            <div className='allSorts'>
                <select className="sortAlp" name="" id="" onChange={event => handleSortedAlp(event)}> {/* Sort UP || DOWN*/}
                    <option value="rnd">Random</option>
                    <option value="up">Ascendant</option>
                    <option value="down">Descendent</option>
                </select>

                <select className="sortAlp" name="" id="" onChange={event => handleSortAttack(event)}> {/* Filter ATTACK POWER*/}
                    <option value="rnd">Random</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>
                </select>

                <select className="sortAlp" name="" id="" onChange={event => handleFilterDB(event)}> {/* Filter API || DB*/}
                    <option value="All">All</option>
                    <option value="API">API</option>
                    <option value="DB">DB</option>
                </select>

                <select className="sortAlp" name="" id="" onChange={event => handleFilterType(event)}> {/* Filter by TYPES*/}
                <option value="All">All</option>
                    {allTypes?.map((type) => {
                        return (
                            <option value={type.name}>{type.name}</option>
                        )
                    })
                    }
                </select>
            </div>
                <Paginate pokemonsPerPage={pokemonsPerPage} currentPage={currentPages} setPages={setCurrentPages} allPokemons={allPokemons.length} paginate={paginate}/>
            </div>

                <div className='cartas'>
                    {currentPokemons?.map((pokemon) => {
                            return (
                                <div className="homeCards">
                                    <Link to={`/home/${pokemon.id}`}>
                                        <Card name={pokemon.name} types={pokemon.types} img={pokemon.img ? pokemon.img : 'https://cdn.vox-cdn.com/thumbor/-famZFxgMFo2h1HQ5UjIIcBszrI=/0x0:1920x1080/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/53254027/who_pokemon.0.jpg'}/>
                                    </Link>
                                </div>
                            )
                        })
                    }

                </div>
        </div>
    )
}