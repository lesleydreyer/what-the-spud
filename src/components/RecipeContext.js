import React, { useState } from 'react';

const RecipeContext = React.createContext([{}, () => { }]);

const RecipeProvider = (props) => {
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
    return (
        <RecipeContext.Provider value={[state, setState]}>
            {props.children}
        </RecipeContext.Provider>
    );
}

export { RecipeContext, RecipeProvider };