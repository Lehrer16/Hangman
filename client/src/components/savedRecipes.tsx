import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import './SavedRecipes.css';

interface savedRecipesProps {
    username: string;
    token: string;
}

const SavedRecipes = ({username, token}: savedRecipesProps) => {
    const [recipes, setRecipes] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const response = await fetch(`/api/userRecipe/${username}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${token}`
                    },
                });
                const data = await response.json();
                for (let i=0; i<data.length; i++) {
                    const apiKey = '512a655e48f54350ab4a1694077b9966';
                    try {
                        const response = await fetch(
                            `https://api.spoonacular.com/recipes/${data[i].recipeID}/information?apiKey=${apiKey}`
                        );
                        const data2 = await response.json();
                        data[i].title = data2.title;   
                    } catch (error) {
                        console.error('Error fetching recipe details:', error);
                    }
                }
                console.log(data);
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching saved recipes:', error);
            }
        };

        fetchSavedRecipes();
    }, []);

    return (
        <div className="saved-recipes-container">
            <h1>Saved Recipes</h1>
            <ul className="recipe-list">
                {recipes.map((recipe, index) => (
                    <li key={index} className="recipe-item" onClick={() => navigate(`/recipe/${recipe.recipeID}`)}>
                        Recipe: {recipe.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SavedRecipes;
