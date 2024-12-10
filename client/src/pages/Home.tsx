import React, { useState } from 'react';
import '../utils/auth.ts'
import logo from '../assets/hangman_pic.png'
import '../index.css'

const Home = () => {
  // States used to control login form visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Handle form inputs
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  // Handle login form submission (JWT integration)
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send credentials to the backend API for verification
    const loginData = { email, password };
    try {
      const response = await fetch('http://127.0.0.1:3001', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      const { token } = data; // Assuming the backend returns a JWT token

      // Store the JWT token in localStorage or sessionStorage
      localStorage.setItem('token', token);

      // Update the state
      setIsLoggedIn(true);
      setShowLoginForm(false);
    } catch (error) {
      console.error(`Error ${isLoggedIn ? 'signing up' : 'logging in'}:`, error);
    }
  };

  // Handle create account form submission (you'll integrate this with backend later)
  const handleCreateAccountSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle account creation logic (API call)
    alert('Account created!');
    setShowCreateAccountForm(false);
  };

  // Toggle between login and create account forms
  const toggleLoginForm = () => {
    setShowLoginForm(true);
    setShowCreateAccountForm(false);
  };
  const toggleCreateAccountForm = () => {
    setShowCreateAccountForm(true);
    setShowLoginForm(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  // Check if the user is logged in based on the token in localStorage
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="homePage">
      <div>
        <img className="logo" src={logo} alt="Hangman" />
      </div>

      {/* Conditional rendering based on login status */}
      {isLoggedIn ? (
        <div>
          <h2>Welcome back!</h2>
          {/* You can add more user-related content here */}
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
          {/* Display login and create account buttons */}
          <button className="login" onClick={toggleLoginForm}>Log-In</button>
          <button className="create" onClick={toggleCreateAccountForm}>Create Account</button>
        </div>
      )}

      {/* Login Form */}
      {showLoginForm && (
        <div>
          {/* <h2>Log In</h2> */}
          <form onSubmit={handleLoginSubmit}>
            <div>
              <label>Email:</label>
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div>
              <label>Password:</label>
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="submit">Log In</button>
          </form>
        </div>
      )}

      {/* Create Account Form */}
      {showCreateAccountForm && (
        <div>
          {/* <h2>Create Account</h2> */}
          <form onSubmit={handleCreateAccountSubmit}>
            <div>
              <label>Email:</label>
            </div>
            <div>
              <input
                type="email"
                required
              />
            </div>
            <div>
              <label>Password:</label>
            </div>
            <div>
              <input
                type="password"
                required
              />
            </div>
            <div>
              <label>Confirm Password:</label>
            </div>
            <div>
              <input
                type="password"
                required
              />
            </div>
            
            <button type="submit">Create Account</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
