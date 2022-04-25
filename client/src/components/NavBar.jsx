import React from "react";
import SearchBar from "./SearchBar";
import styles from './NavBar.modules.css';


export default function NavBar() {
    return (
        <div className="nav">
            <img className="pokeboll" src="https://cdn-icons.flaticon.com/png/512/1169/premium/1169608.png?token=exp=1650824523~hmac=ec985ee69bbc744a01b4e144e50809d5" alt="pokeboll" />
            <a href="https://github.com/geronimoeth"><img className="github" src="https://logos-download.com/wp-content/uploads/2016/09/GitHub_logo.png" alt="" /></a>
            <h3 className="title"><a href="/">My Pokemon PI</a></h3>
            <SearchBar className="searchbar"/>
        </div>
    )
}