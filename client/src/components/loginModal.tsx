import React, { useState, FormEvent } from 'react';
import './loginModal.css';

interface LoginModalProps {
    show: boolean;
    handleClose: () => void;
    onLoginSuccess: (username: string, token: string) => void; 
}

const LoginModal: React.FC<LoginModalProps> = ({ show, handleClose, onLoginSuccess }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSignUp, setIsSignUp] = useState<boolean>(false);  

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const endpoint = isSignUp ? '/auth/register' : '/auth/login';  
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const data = await response.json();
                alert("Login successful");
                onLoginSuccess(username, data.token); 
                handleClose(); 
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error(`Error ${isSignUp ? 'signing up' : 'logging in'}:`, error);
        }
    };

    if (!show) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-content">
                    <button onClick={handleClose} className="close-button">X</button>

                    <div className="toggle-buttons">
                        <button 
                            className={isSignUp ? '' : 'active'} 
                            onClick={() => setIsSignUp(false)}
                        >
                            Login
                        </button>
                        <button 
                            className={isSignUp ? 'active' : ''} 
                            onClick={() => setIsSignUp(true)}
                        >
                            Sign Up
                        </button>
                    </div>

                    <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
