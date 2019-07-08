import React, { useEffect, useState, useContext, createContext } from 'react';
import { BrowserRouter } from "react-router-dom";
import ScrollHandler from './ScrollHandler';
import Hero from './Hero';
import NewRecipe from './NewRecipe';
import RecipeList from './RecipeList';
import Footer from './Footer';
import base from '../base';//import Rebase from 're-base';
import firebase from 'firebase';



function App() {
  const [state, setState] = useState()
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const recipesRef = firebase.database().ref('recipes');
    recipesRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: items[item].id,
          title: items[item].title,
          ingredients: items[item].ingredients,
          directions: items[item].directions
        });
      }
      setRecipes(newState);
    })
  }, [state]);


  return (
    <BrowserRouter>
      <ScrollHandler />
      <Hero />
      <div className="box">
        <section className="recipe-list-section">
          <RecipeList recipes={recipes} />
        </section>
        <hr />
        <section className="add-recipe-section">
          <NewRecipe />
        </section>
        <hr />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;