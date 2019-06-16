import React, { useState, useReducer, useRef, useEffect } from 'react';
import axios from 'axios';
import { API } from '../config';

function NewRecipe() {
    const [ingredients, setIngredients] = useState([{ id: 0, value: null }]);
    const [title, setTitle] = useState('');
    const [directions, setDirections] = useState('');
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        ingredients.map(i => { console.log(i.value) })
    }, [])

    const handleSubmitRecipe = event => {
        event.preventDefault();
        setRecipes([...recipes, { title, ingredients, directions }]);
        //recipes.map(r => console.log(r.title))
        //doesn't save the last submitted recipe
        //const recipe = { title, ingredients, directions };
        //console.log(recipe.title)
        axios.post(`${API}`, { title, ingredients, directions })
            .then(res => {
                setTimeout(() => {
                    console.log(res)
                }, 3000)
            })
            .catch(err => {
                console.log(err)
            })
        //wes bos firebase plugin restaurant app
        setTitle('');
        setDirections('');
        setIngredients([]);

    };

    const handleChangeIngredient = (i, event) => {
        const values = [...ingredients];
        values[i].value = event.target.value;
        setIngredients(values);
        /*setIngredients([
            ...ingredients,
            {
                id: i,
                value: event.target.value
            }
        ])*/
    }
    function handleAddIngredient() {
        setIngredients([
            ...ingredients,
            {
                id: ingredients.length,
                value: null
            }
        ])
    }
    function handleRemoveIngredient(i) {
        const values = [...ingredients];
        values.splice(i, 1);
        setIngredients(values);
        //setIngredients(ingredients.filter(t => t.id !== idx));
    }

    return (
        <div className="container">
            <div className='form'>
                <form onSubmit={handleSubmitRecipe}>
                    <legend >Add a Recipe</legend>
                    <label>Recipe Title</label>
                    <input
                        type='text'
                        placeholder='Recipe Title'
                        value={title}
                        onChange={e => { setTitle(e.target.value); }}
                    />
                    <label>Ingredients</label>
                    {ingredients.map((ingredient, index) => {
                        //console.log('index', index, 'ingred', ingredient)
                        return (
                            <div key={`${ingredient}-${index}`}>
                                <input
                                    type="text"
                                    placeholder="Enter ingredient"
                                    value={ingredient.value || ""}
                                    onChange={e => handleChangeIngredient(index, e)}
                                />
                                <button type="button" onClick={() => handleRemoveIngredient(index)}>x</button>
                            </div>
                        );
                    })}
                    <button type="button" onClick={() => handleAddIngredient()}>+</button>
                    <label>Directions</label>
                    <textarea
                        name="directions"
                        value={directions}
                        onChange={e => setDirections(e.target.value)}
                        rows='10'
                    />
                    <button>Submit Recipe</button>
                </form>
            </div>
        </div>
    )
}

export default NewRecipe;