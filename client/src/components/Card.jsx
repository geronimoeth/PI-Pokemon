import React from 'react';
import styles from './Card.modules.css';

export default function Card({ name, types, img}) {
    return (
        <div className='cardContainer'>
                    <img className='image' src={img} alt="Pokemon Not Found"/>
                    <h3 className='name'>{name}</h3>
                    <h5 className='types'> Types: {types.map(type => type + " ")}</h5>
        </div>
    )
}