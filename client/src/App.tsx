import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginModal from './components/loginModal'; // Import LoginModal
import Hangman from './pages/Hangman'
import Home from './pages/Home';


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
                <Route path="/hangman" element={<Hangman />} />
                <Route path="/" element={<Home />} />
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
