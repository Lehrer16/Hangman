import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Body from './components/body';
import RecipeDetails from './components/recipeDetails';
import CocktailBody from './components/cocktailBody'; 
import CocktailDetails from './components/cocktailDetails'; 
import Navbar from './components/Navbar';
import LoginModal from './components/loginModal'; // Import LoginModal
import SavedRecipes from './components/savedRecipes';

const App = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [token, setToken] = useState<string>("");

    const handleLoginClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleLoginSuccess = (username: string, token: string) => {
        setUsername(username);
        setShowModal(false); // Optionally close modal after successful login
        setToken(token);
    };

    return (
        <Router>
            <Navbar onLoginClick={handleLoginClick} username={username} /> {/* Pass username to Navbar */}
            <Routes>
                <Route path="/" element={<Body />} />
                <Route path="/cocktail" element={<CocktailBody />} />
                <Route path="/cocktail/:id" element={<CocktailDetails />} /> 
                <Route path="/recipe/:id" element={<RecipeDetails token = { token } username= {username}/>} />
                <Route path="/saved-recipes" element={<SavedRecipes username={ username } token = { token }/>} />
            </Routes>
            <LoginModal 
                show={showModal} 
                handleClose={handleCloseModal} 
                onLoginSuccess={handleLoginSuccess} 
            />
        </Router>
    );
};

export default App;
