import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from '../store/actions';
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";

import styles from './PokemonCreate.modules.css'

function validate (form) {
    let errors = {};
    
    if (!form.name) {
        errors.name = `A Pokemon isn't it whitout a name`
    } else if (form.types.length < 1) {
        errors.types = `A Pokemon isn't it whitout at least ONE type`
    }

    return errors;
}

export default function PokemonCreate() {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const history = useHistory();
    // const [openModal,setOpenModel] = useState(false);
    
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        name: "",
        types: [],
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        img: "",
    })

    useEffect(() => {
        dispatch(getTypes());
    }, []);

    function handleChange(event) {
        event.preventDefault();
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        setErrors(validate({
            ...form,
            types: form.types,
            [event.target.name]: event.target.value
        }))
        console.log(form);
    }

    function handleCheck(event) {

        if (event.target.checked) {
            setForm({
                ...form,
                types: [...form.types, event.target.id]
            })

            setErrors(validate({
                ...form,
                types: form.types,
                [event.target.name]: event.target.value
            }))
        } else {
            form.types.find(function(element) {
                if (element === event.target.id) {
                    setForm({
                        ...form,
                        types: form.types.filter(type => type !== element)
                    })
                }
            });
        }

    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(postPokemon(form));
        setForm({
            name: "",
            types: [],
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            img: "",
        })
        history.push('/home');
    }

    function handleAlert(event) {
        alert('Hey your Pokemon was successfully created :D')
    }

    return (
        <div className="createBigContainer">
            <div className="smallContainer">
                    <h1 className="createTitle">CREATE YOUR POKÉMON</h1>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div >
                        <label>Name </label>
                        <input type="text" value={form.name} name="name" onChange={(event) => handleChange(event)}/>
                        {errors.name && (
                            <p className="error">{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label className="createTypes" >Types</label>
                        {types?.map((type) => {
                            return (
                                <label ><input type="checkbox" name={type.name} value={type.name} id={type.id} onChange={(event) => handleCheck(event)}/>{type.name}</label>
                            )
                        })
                        }
                        {errors.types && (
                            <p className="error">{errors.types}</p>
                        )}
                    </div>
                    <div>
                        <label>HP </label>
                        <input type="number" value={form.hp} name="hp" required onChange={(event) => handleChange(event)}/>
                    </div>
                    <div>
                        <label>Attack </label>
                        <input type="number" value={form.attack} name="attack" required onChange={(event) => handleChange(event)}/>
                    </div>
                    <div>
                        <label>Defense </label>
                        <input type="number" value={form.defense} name="defense" required onChange={(event) => handleChange(event)}/>
                    </div>
                    <div>
                        <label>Speed </label>
                        <input type="number" value={form.speed} name="speed" required onChange={(event) => handleChange(event)}/>
                    </div>
                    <div>
                        <label>Height </label>
                        <input type="number" name="height" required onChange={(event) => handleChange(event)}/>
                    </div>
                    <div>
                        <label>Weight </label>
                        <input type="number" value={form.weight} name="weight" required onChange={(event) => handleChange(event)}/>
                    </div>
                    <div>
                        <label>Image </label>
                        <input type="text" value={form.img} name="img" required onChange={(event) => handleChange(event)}/>
                    </div>

                    {!errors.name && !errors.types &&(
                        <button className="submitButton" onClick={() => handleAlert()}>SUBMIT</button>
                    )
                    }
                    {/* {openModal && <Modal />} */}
                <Link to='/home'>
                    <button className="submitButton" name={form.name}>Go Back</button>
                </Link>
                    
                </form>
            </div>
        </div>
    )
}