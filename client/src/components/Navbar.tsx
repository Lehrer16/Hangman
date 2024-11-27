import { Link } from 'react-router-dom';
import React from 'react';

interface NavbarProps {
    onLoginClick: () => void; 
    username: string; // Accept username prop
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, username }) => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/cocktail">Cocktail Recipes</Link></li> 
                <li><Link to="/saved-recipes">Saved Recipes</Link></li>
                <li style={{ cursor: 'pointer' }} onClick={username ? undefined : onLoginClick}>
                    {username ? username : 'Log In'} {/* Show username if logged in */}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
