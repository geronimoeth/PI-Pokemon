import React from "react";
import styles from './Paginate.modules.css'

export default function Paginate ({pokemonsPerPage, allPokemons, paginate, setPages, currentPage}) {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumber.push(i);
    }
    
        function handlePrev() {
            if (currentPage !== 1) {
                setPages(currentPage - 1);
            } else {
                alert('You are already in the first page');
            }
        }

        function handleNext() {
            if (currentPage !== 4) {
                setPages(currentPage + 1);
            } else {
                alert('There are no more pages');
            }
        }

    return (
        <nav className="paginateNav">
            <ul className="paginate">
                <button className="paginateButtons" onClick={event => handlePrev(event)}>Prev</button>
                {pageNumber?.map(quantity => (
                    <li className="cuantity" key={quantity}>
                        <a onClick={() => paginate(quantity)} key={quantity}>{quantity}</a>
                    </li>
                ))}
                <button className="paginateButtons" onClick={event => handleNext(event)}>Next</button>
            </ul>
        </nav>
    )
}