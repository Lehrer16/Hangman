import { Link } from 'react-router-dom';
import React from 'react';



const Navbar: React.FC= ({ }) => {
    return (
        <div className='container'>
        <nav className="navbar">
            <ul>
                <Link to="/">Home   </Link>
                <Link to="/Account"> Account   </Link>
                <Link to="/Hi-Scores"> Hi-Scores   </Link>
            </ul>
        </nav>
        </div>
    );
};

export default Navbar;
