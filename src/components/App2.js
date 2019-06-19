import React, { useEffect, useState } from 'react';
import Hero from './Hero';
import NewRecipe from './NewRecipe';
import RecipeList from './RecipeList';
import { RecipeProvider } from './RecipeContext';
import base from '../base';

class App extends React.Component {
    state = {
        recipes: []
    }
    componentDidMount() {
        this.ref = base.syncState('https://whatthespud-d726f.firebaseio.com/recipes', {
            context: this,
            state: 'recipes',
            asArray: true
        })
    }
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    //context maybe good for theme or language
    //if rebase doesnt work, make app fetch recipes and pass down with a prop onadd
    render() {
        return (
            <RecipeProvider>
                <Hero />
                <div className="box">
                    <section className="recipe-list-section">
                        <RecipeList />
                    </section>
                    <hr />
                    <section className="add-recipe-section">
                        <NewRecipe />
                    </section></div>
            </RecipeProvider>
        );
    }
}

export default App;
//https://calendarific.com/holidays/2019/us
//https://www.theaudiodb.com/
//https://holidayapi.com/
//https://us.openfoodfacts.org/cgi/search.pl?search_terms=apple&search_simple=1&action=process


/*


    <div className="hero-image">
      <header>
        <section className="hero-text">
          <h1>What the Spud?</h1>
          <p>Can't stand another plain old baked potato? Try something</p>
          <button>View Recipes</button>
          <button>Add a Recipe</button>
        </section>
      </header>
      <section className="recipe-list">
        <ul>
          <li>Baked Potatoes</li>
          <li>French Fries</li>
          <li>Hassleback Potatoes</li>
        </ul>
      </section>
    </div>
*/