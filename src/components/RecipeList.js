import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { RecipeContext } from './RecipeContext';
import { API } from '../config';
import firebase from 'firebase';

function RecipeList() {
    const [state, setState] = useContext(RecipeContext)
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
            console.log('reb', recipes, 'st', state)
            //setRecipes => {({ recipes: newState })}
            //setState => ({ recipes }) => setRecipes({ ...recipes });
        })
    }, [state]);

    return (
        <div className='container' id="view-recipes-section">
            <h3>Recipe List</h3>
            <ul>
                {
                    state.recipes.map(rec => <li>{rec.title}</li>)
                }
                {recipes.map(recipe => <li key={recipe.id}>{recipe.title}</li>)}
            </ul>
        </div>
    )
}

export default RecipeList;

/*
function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        fetch(``${API}``)
            .then(response => response.json())
            .then(json => { console.log(json); setRecipes(json) })
    }, [])
    return (
        <div className='container'>
            <h3>Recipe List</h3>
            <ul>
                {Object.values(recipes).map(recipe => <li>{recipe.title}</li>)}
            </ul>
        </div>
    )
}

export default RecipeList;
*/