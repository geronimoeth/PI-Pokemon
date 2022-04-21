import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonsQuery } from "../store/actions";

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
        <div>
            <input type="text" value={name} placeholder="Search in Pokedex" onChange={event => handleInputChange(event)}/>
            <button type="submit" onClick={(event) => handleSubmit(event)}>Go</button>
        </div>
    )
}