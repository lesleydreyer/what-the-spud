import React, { useState, useEffect } from 'react';
import firebase from 'firebase';

function NewRecipe() {
    const [ingredients, setIngredients] = useState([{ id: 0, value: null }]);
    const [title, setTitle] = useState('');
    const [directions, setDirections] = useState('');

    const handleSubmitRecipe = event => {
        event.preventDefault();
        const item = {
            title, ingredients, directions
        }
        const recipesRef = firebase.database().ref('recipes');
        recipesRef.push(item);
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
        <div className="container" id={"new-recipe-section"}>
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
                        return (
                            <div key={`${ingredient}-${index}`}>
                                <input
                                    id="add-ingredient-input"
                                    type="text"
                                    placeholder="Enter ingredient"
                                    value={ingredient.value || ""}
                                    onChange={e => handleChangeIngredient(index, e)}
                                />
                                <button id="btn-remove-ingredient" type="button" title="remove ingredient" onClick={() => handleRemoveIngredient(index)}>x</button>
                            </div>
                        );
                    })}
                    <button type="button" id="btn-another-ingredient" title="add another ingredient" onClick={() => handleAddIngredient()}>+</button>
                    <label>Directions</label>
                    <textarea
                        name="directions"
                        value={directions}
                        onChange={e => setDirections(e.target.value)}
                        rows='10'
                    />
                    <button className="btn-newline" title="submit recipe">Submit Recipe</button>
                </form>
            </div>
        </div>
    )
}

export default NewRecipe;