import React from 'react';

export default function Card({ name, types, img}) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{types}</h5>
            <img src={img} alt="Pokemon Not Found" width="200px" height="250px" />
        </div>
    )
}