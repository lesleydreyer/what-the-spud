import React from 'react';

function Hero() {
    return (
        <header className="hero-image">
            <section className="hero-text">
                <h1>What the Spud </h1>
                <p>Can't stand another plain old baked potato? Try something new!</p>
                <button>View Recipes</button>
                <button onClick={() => {/*scroll to add-recipe-section */ }}>Add A Recipe</button>
            </section>
        </header>
    )
}

export default Hero;