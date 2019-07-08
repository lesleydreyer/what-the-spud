import React from 'react';
import { Link } from "react-router-dom";
import './hero.css';

function Hero() {
    return (
        <header className="hero-image">
            <section className="hero-text">
                <h1>What the Spud </h1>
                <p>Can't stand another plain old baked potato? Try something new!</p>
                <Link to={`/#view-recipes-section`}>
                    <button>View Recipes</button>
                </Link>
                <Link to={`/#new-recipe-section`}>
                    <button>Add A Recipe</button>
                </Link>
            </section>
        </header>
    )
}

export default Hero;