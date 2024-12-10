import { Link } from 'react-router-dom';
import React from 'react';



const Navbar: React.FC= ({ }) => {
    return (
        <div className='container'>
        <nav className="navbar">
            <Link to="/">
            <button>Home</button>
            </Link>
            <Link to="/Account">
            <button>Account</button>
            </Link>
            <Link to="/Hi-Scores">
            <button>High Scores</button>
            </Link>

        </nav>
        </div>
    );
};

export default Navbar;
