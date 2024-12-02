import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import Navbar from './components/Navbar';
import Account from './components/Account'
=======
>>>>>>> e856eecc19cf6674e331bc21aeac951ab7b1aa16
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
<<<<<<< HEAD
            
=======
>>>>>>> e856eecc19cf6674e331bc21aeac951ab7b1aa16
            <Routes>
                <Route path="/hangman" element={<Hangman />} />
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<Account />} />
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
