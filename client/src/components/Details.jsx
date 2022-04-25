import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../store/actions";
import { useEffect } from "react";
import styles from './Details.modules.css';

export default function Details(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [])

    const myPokemon = useSelector((state) => state.details);

    console.log(myPokemon.types);

    return (
        <div className="bigContainer">
            {myPokemon?
            <div className="pokemon">
                <div className="container">
                    <div className="nameImgId">
                        <h1 className="pokename">{myPokemon.name}</h1>
                        <h3 className="pokeid">ID {myPokemon.id}</h3>
                        <img className="pokeimage" src={myPokemon.img} alt="" />
                    </div>
                    <div className="details">
                        <h3 className="poketype">Types: {myPokemon.types?.map(el => el + (' '))}</h3>
                        <h4 className="pokehp">HP {myPokemon.hp}</h4>
                        <h4 className="pokeattack">ATTACK {myPokemon.attack}</h4>
                        <h4 className="pokedefense">DEFENSE {myPokemon.defense}</h4>
                        <h4 className="pokespeed">SPEED {myPokemon.speed}</h4>
                        <h4 className="pokeheight">HEIGHT {myPokemon.height}</h4>
                        <h4 className="pokeweight">WEIGHT {myPokemon.weight}</h4>
                    </div>
                </div>
            </div> : <p>Loading...</p>
            }

            <Link to='/home'>
                <button className="dButton">Go Back</button>
            </Link>
        </div>
    )
}