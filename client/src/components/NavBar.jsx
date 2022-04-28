import React from "react";
import SearchBar from "./SearchBar";
import styles from './NavBar.modules.css';
import { useLocation } from "react-router";
import pokemon from '../images/pokemon.png';
import github from '../images/github.png'

export default function NavBar() {

    return (
        <div className="nav">
            <img className="pokeboll" src={pokemon} alt="pokeboll" />
            <a href="https://github.com/geronimoeth"><img className="github" src={github} alt="" /></a>
            <h3 className="title"><a href="/">My Pokemon PI</a></h3>
            {location.pathname !== '/' ?
                <SearchBar className="searchbar"/>
             : <div> </div>
            }
        </div>
    )
}