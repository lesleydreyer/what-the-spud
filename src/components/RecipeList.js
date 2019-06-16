import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { RecipeContext } from './RecipeContext';
import { API } from '../config';

function RecipeList() {
    const [state, setState] = useContext(RecipeContext)
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        //fetch(`${API}`, {
        //  method: 'GET'
        //})
        axios.get(`${API}`)
            //.then(response => response.json())
            .then(json => {
                const results = json.data;
                const resultsArray = [];
                for (const key in results) {
                    resultsArray.push({ id: key, title: results[key].title, ingredients: results[key].ingredients, directions: results[key].directions })
                }
                setRecipes(resultsArray);
                //setState({ rec: resultsArray });
                //setState(state => ({ ...state, rec: resultsArray }))
                //console.log('state', state.rec)
            })
        return () => { console.log('cleanup') }
    }, [])
    return (
        <div className='container'>
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