import React from 'react';

function RecipeList({ recipes }) {

    return (
        <div className='container'>
            <h3>Recipe List</h3>
            <ul>

                {recipes && recipes.map(recipe => <li key={recipe.id}>{recipe.title}</li>)}
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