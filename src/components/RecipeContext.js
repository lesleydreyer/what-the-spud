import React, { useState, useEffect } from 'react';
import base from '../base';
import firebase from 'firebase';

const RecipeContext = React.createContext([{}, () => { }]);

const RecipeProvider = (props) => {
    const [state, setState] = useState({});
    const [recipes, setRecipes] = useState({});

    //context maybe good for theme or language
    //if rebase doesnt work, make app fetch recipes and pass down with a prop onadd
    useEffect(() => {
        console.log('reccontext')
        const recipesRef = base.syncState('recipes', {
            context: {
                setState: ({ recipes }) => setRecipes({ ...recipes }),
                state: { recipes }
            },
            state: 'recipes'
        });
        console.log('recie', recipes, 'st', state)
        return () => { base.removeBinding(recipesRef) }
    }, []);

    //const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        console.log('recipes get in contest')
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



    console.log('this', recipes)
    return (
        <RecipeContext.Provider value={[state, setState]}>
            {/*props.children*/Object.values(recipes).map((recipe) => (recipe.id, recipe.title, recipe.ingredients, recipe.directions))}
        </RecipeContext.Provider>
    );
}

export { RecipeContext, RecipeProvider };

/*
const [state, setState] = useState({
        recipes: [
            {
                title: 'recipe1',
                ingredients: [
                    'chicken', 'potatoes'
                ],
                directions: 'lorem ipsum'
            },
            {
                title: 'recipe2',
                ingredients: [
                    'potatoes', 'salt', 'pepper'
                ],
                directions: 'lorem ipsum'
            },
            {
                title: 'recipe3',
                ingredients: [
                    'potatoes', 'olive oil', 'onion'
                ],
                directions: 'lorem ipsum'
            }
        ]
    });
*/