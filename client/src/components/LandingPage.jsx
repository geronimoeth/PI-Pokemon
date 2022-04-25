import React from "react";
import { Link } from 'react-router-dom';
import styles from "./LandingPage.modules.css";

export default function LandingPage() {
    return (
        <div className="all">
            <h1 className="welcomeTitle">Welcome to my Pokemon Project</h1>
            <Link to = '/home'>
                <button className="button">Home</button>
            </Link>
        </div>
    )
}