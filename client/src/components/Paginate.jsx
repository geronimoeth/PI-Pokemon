import React from "react";

export default function Paginate ({pokemonsPerPage, allPokemons, paginate}) {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <nav>
            <ul className="paginate">
                {pageNumber?.map(quantity => (
                    <li className="cuantity" key={quantity}>
                        <a onClick={() => paginate(quantity)} key={quantity}>{quantity}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}