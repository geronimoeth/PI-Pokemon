import React from 'react'
import { getPokemonsQuery } from "../store/actions";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Modal.modules.css';

export default function Modal({name}) {

    const dispatch = useDispatch();

    function handleSee(event) {
        console.log(name)
        event.preventDefault();
        dispatch(getPokemonsQuery(name));
    }

  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
            <div className='title'>
                <h1>Your Pokemon was successfully created :D</h1>
            </div>
            <div className='body'>
                <p>Do you want to see what you've created?</p>
            </div>
            <div className='footer'>

                <Link to='/home'>
                    <button>Home</button>
                </Link>
                <button onClick={event => handleSee(event)}>Let's see!</button>
            </div>
        </div>
    </div>
  )
}