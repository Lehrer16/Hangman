import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./cocktailDetails.css"
const CocktailDetails = () => {
    const { id } = useParams<{ id: string }>(); 
    const [cocktail, setCocktail] = useState<any>(null);
    const navigate = useNavigate(); // Use navigate for the back button

    useEffect(() => {
        const fetchCocktailDetails = async () => {
            try {
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();
                console.log(data); // Log the response to debug
                setCocktail(data.drinks ? data.drinks[0] : null); // Ensure we handle the case where drinks is undefined
            } catch (error) {
                console.error('Error fetching cocktail details:', error);
            }
        };

        fetchCocktailDetails();
    }, [id]);

    if (!cocktail) return <div className="loading">Loading...</div>; 

    return (
        <div className="cocktail-details-container">
            <h1 className="cocktail-title">{cocktail.strDrink}</h1>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width="200" className="cocktail-image" />
            <h3 className="ingredient-title">Ingredients:</h3>
            <ul className="ingredient-list">
                {Object.keys(cocktail)
                    .filter(key => key.startsWith('strIngredient') && cocktail[key]) 
                    .map((key, index) => (
                        <li key={index} className="ingredient-item">{cocktail[key]}: {cocktail[`strMeasure${index + 1}`]}</li>
                    ))}
            </ul>
            <p className="instructions">{cocktail.strInstructions}</p> 
            <button onClick={() => navigate('/cocktail')} className="back-button">Back to Cocktails</button>
        </div>
    );
};

export default CocktailDetails;
