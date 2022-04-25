import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonsQuery } from "../store/actions";
import styles from './SearchBar.modules.css';

export default function SearchBar () {
    const dispatch = useDispatch();

    const [name, setName] = useState("");

    function handleInputChange(event) {
        event.preventDefault();
        setName(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getPokemonsQuery(name));
        setName("");
    }


    return (
        <div className="search">
            <input className="searchInput" type="text" value={name} placeholder="Search in Pokedex" onChange={event => handleInputChange(event)}/>
            <button className="searchButton" type="submit" onClick={(event) => handleSubmit(event)}>Go</button>
        </div>
    )
}