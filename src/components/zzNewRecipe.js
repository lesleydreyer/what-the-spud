import React, { useState, useReducer, useRef } from 'react';

const initialRecipeState = {
    ingredients: [],
    directions: ''
};

const TYPES = {
    ADD_INGREDIENT: 'ADD_INGREDIENT'
}

const recipeReducer = (state, action) => {
    switch (action.type) {
        case TYPES.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredient]
            }
        default:
            return state;
    }
}

function NewRecipe() {
    const [ingredients, setIngredients] = useState([{ value: null }]);
    const [title, setTitle] = useState('');
    const [directions, setDirections] = useState('');
    const [fields, setFields] = useState([{ value: null }]);

    const [form, setValues] = useState({
        title: '',
        ingredients: [],
        directions: ''
    })
    const printValues = event => {
        event.preventDefault();
        console.log(form.title, form.ingredients, form.directions);
    };
    const updateField = event => {
        setValues({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleChange = (i, event) => {
        const values = [...ingredients];
        values[i].value = event.target.value;
        setIngredients(values);
    }
    function handleAdd() {
        const currentIngredients = [...ingredients];
        currentIngredients.push({ value: null });
        setIngredients(currentIngredients);
        console.log('values', ingredients)
    }
    const addIngredient = (event) => {
        event.preventDefault();
        setIngredients([
            ...ingredients,
            {
                id: ingredients.length,
                ingredient: ingredientInputRef.current.value
            }
        ]);
        console.log('state', ingredients)
    };

    const ingredientInputRef = useRef();
    //const [state, dispatch] = useReducer(recipeReducer, initialRecipeState)
    const [recipe, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case TYPES.ADD_INGREDIENT:
                console.log('hit reducer', state)
                return {
                    ...state,
                    ingredients: [...state.ingredients, action.ingredient]
                }
            default:
                return state;
        }
    }, []);

    function addAnotherIngredient(event) {
        /*event.preventDefault();
        dispatch({
            type: TYPES.ADD_INGREDIENT,
            ingredient: ingredientInputRef.current.value
        });
        ingredientInputRef.current.value = '';*/
        setIngredients(ingredientInputRef.current.value);
    }
    return (//{/*onSubmit={addAnotherIngredient}*/}
        <div className="container">
            <div className='form'>
                <h3 >Add a Recipe</h3>
                <ul>{ingredients.map(ingredient => (
                    <li key={ingredient.id}>{ingredient.ingredient}</li>
                ))}</ul>
                <form onSubmit={printValues}>
                    <input type='text' placeholder='Recipe Title' />
                    <br />
                    <h4>Ingredients</h4>

                    {ingredients.map((field, idx) => {
                        return (
                            <div key={`${field}-${idx}`}>
                                <input
                                    type="text"
                                    placeholder="Enter ingredient"
                                    value={field.value || ""}
                                    onChange={e => handleChange(idx, e)}
                                />
                            </div>
                        );
                    })}
                    <button type="button" onClick={() => handleAdd()}>
                        +
      </button>


                    <br />
                    <br />
                    <h4>Directions</h4>
                    <textarea
                        name="directions"
                        value={form.directions}
                        onChange={updateField}
                        rows='10'
                    />
                    <br />
                    <button>Submit Recipe</button>
                </form>

            </div>
        </div>
    )
}

export default NewRecipe;


/*
                    <input
                        ref={ingredientInputRef}
                        type='text'
                        name="ingredients"
                        value={form.ingredients}
                        onChange={updateField}
                    />
                    <br />
                    <div className="additional-ingredients"></div>
                    <button onClick={addIngredient}>+</button>
*/