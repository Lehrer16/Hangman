import React, { useState } from 'react';

const App = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=YOUR_API_KEY`);
    const data = await response.json();
    setRecipes(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  return (
    <div>
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {recipes.map(recipe => (
          <div key={recipe.id}>
            <h2>{recipe.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;