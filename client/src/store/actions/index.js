import axios from 'axios';
import { GET_POKEMONS, GET_TYPES, FILTER_TYPES, FILTER_DB, ALPHABETICAL_ORDER, ATTACK_ORDER, GET_POKEMONS_QUERY, POST_POKEMON, GET_DETAILS} from '../../consts';

export function getPokemons() {
    return async function(dispatch) {
        var json = await axios.get('/api/pokemons');
        return dispatch({
            type: GET_POKEMONS,
            payload: json.data
        })
    }
}
export function getPokemonsQuery(name) {
    return async function(dispatch) {
        try {
            var json = await axios.get(`/api/pokemons?name=${name}`);
            return dispatch({
                type: GET_POKEMONS_QUERY,
                payload: json.data
            })
        } catch (error) {
            alert(`Sorry, the Pokemon you are looking for doesn't exists :(`);
        }
         
    }
}

export function getDetail(id) {
    if (!id) {
        return ({
            type: GET_DETAILS,
            payload: [],
        })
    }
    return async function(dispatch) {
        var json = await axios.get(`/api/pokemons/${id}`);
        return dispatch({
            type: GET_DETAILS,
            payload: json.data
        })
    }
}

export function postPokemon(payload) {
    return async function() {
        var json = await axios.post('/api/pokemons', payload);
        return json
    }
}

export function getTypes() {
    return async function(dispatch) {
        var json = await axios.get('/api/types');
        return dispatch({
            type: GET_TYPES,
            payload: json.data
        })
    }
}

export function filterPokemonsByType(payload) {
    return {
        type: FILTER_TYPES,
        payload
    }
}

export function filterByDB(payload) {
    return {
        type: FILTER_DB,
        payload
    }
}

export function orderAlphabetic(payload) {
    return {
        type: ALPHABETICAL_ORDER,
        payload
    }
}

export function orderAttack(payload) { //conviene hacerlo en el back creo
        return {
            type: ATTACK_ORDER,
            payload
        }
}