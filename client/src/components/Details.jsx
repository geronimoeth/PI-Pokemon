import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../store/actions";
import { useEffect } from "react";

export default function Details(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [])

    const myPokemon = useSelector((state) => state.details);

    console.log(myPokemon.types);

    return (
        <div>
            {myPokemon?
            <div>
                <h1>{myPokemon.name}</h1>
                <h3>ID -- {myPokemon.id}</h3>
                <img src={myPokemon.img} alt="" />
                <h3>Types {myPokemon.types?.map(el => el + (' '))}</h3>
                <h4>HP {myPokemon.hp}</h4>
                <h4>ATTACK {myPokemon.attack}</h4>
                <h4>DEFENSE {myPokemon.defense}</h4>
                <h4>SPEED {myPokemon.speed}</h4>
                <h4>HEIGHT {myPokemon.height}</h4>
                <h4>WEIGHT {myPokemon.weight}</h4>
            </div> : <p>Loading...</p>
            }

            <Link to='/home'>
                <button>Go Back</button>
            </Link>
        </div>
    )
}