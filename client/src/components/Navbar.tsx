import { Link } from 'react-router-dom';
import React from 'react';



const Navbar: React.FC= ({ }) => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li> 
                <li><Link to="/Account">Account</Link></li>
                <li><Link to="/Hi-Scores">Hi-Scores</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
