import axios from "axios"
import { all } from "bluebird"
import filter from "bluebird/js/release/filter"
import { startTransition } from "react"
import { FILTER_TYPES, GET_POKEMONS, GET_TYPES, FILTER_DB, ALPHABETICAL_ORDER, ATTACK_ORDER, GET_POKEMONS_QUERY, POST_POKEMON } from "../../consts"

const initialState = {
    types: [],
    pokemons: [],
    noFilteredPokemons: [],
}

export default function reducer (state = initialState, action) {
    switch(action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                noFilteredPokemons: action.payload,
            }
        case GET_POKEMONS_QUERY:
            return {
                ...state,
                pokemons: action.payload
            }
        case POST_POKEMON:
            return {
                ...state
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case FILTER_TYPES:
            let allPokemons = state.noFilteredPokemons; //AGREGAR CONDICIONAL PARA SABER DONDE BUSCAR
            const typeFilter = action.payload === "All" ? allPokemons : allPokemons.filter(pokemon => pokemon.types.some(element => element === action.payload));
            return {
                ...state,
                pokemons: typeFilter,
            }
        case FILTER_DB:
            const allPokemonsDB = state.noFilteredPokemons;
            let filtered;

            if (action.payload === "All") {
                filtered = allPokemonsDB
            } else if (action.payload === "API") {
                filtered = allPokemonsDB.filter(pokemons => !pokemons.createdInDataBase);
            } else {
                filtered = allPokemonsDB.filter(pokemons => pokemons.createdInDataBase);
            }
            return {
                ...state,
                pokemons: filtered.length !== 0 ? filtered : allPokemonsDB,
            }
        case ALPHABETICAL_ORDER: 
            let sortedArr;
            if(action.payload === 'up') {
               sortedArr = state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                });
             } else if (action.payload === 'down') {
                sortedArr = state.pokemons.sort(function (a, b) {
                     if (a.name > b.name) {
                         return -1;
                     }
                     if (a.name < b.name) {
                         return 1;
                     }
                     return 0;
                 });
             } else {
                 sortedArr = state.pokemons.sort(()=> Math.random() - 0.5);
             }
            return {
                ...state,
                pokemons: sortedArr
            }
        case ATTACK_ORDER: 
            let sortByAttack;

            if (action.payload === "high") {
                sortByAttack = state.pokemons.sort(function (a, b) {
                    return b.attack - a.attack;
                });
            } else if (action.payload === "low") {
                sortByAttack = state.pokemons.sort(function (a, b) {
                    return a.attack - b.attack;
                });
            } else {
                sortByAttack = state.pokemons.sort(()=> Math.random() - 0.5);
            }

            return {
                ...state,
                pokemons: sortByAttack
            }
            default: 
                return state;
    }
}