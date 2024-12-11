import React, { useState } from 'react';
import '../utils/auth.ts';
import logo from '../assets/hangman_pic.png';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Login from './Login';
import '../index.css';

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

  // Apollo Client setup
  const httpLink = createHttpLink({
    uri: '/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  // Handle login form submission (JWT integration)
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      const { token } = data;

      localStorage.setItem('token', token);

      setIsLoggedIn(true);
      setShowLoginForm(false);
    } catch (error) {
      console.error(`Error ${isLoggedIn ? 'signing up' : 'logging in'}:`, error);
    }
  };

  // Handle create account form submission (you'll integrate this with backend later)
  const handleCreateAccountSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Account created!');
    setShowCreateAccountForm(false);
  };

  const toggleLoginForm = () => {
    setShowLoginForm(true);
    setShowCreateAccountForm(false);
  };

  const toggleCreateAccountForm = () => {
    setShowCreateAccountForm(true);
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

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

      {isLoggedIn ? (
        <div>
          <h2>Welcome back!</h2>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
          <button className="login" onClick={toggleLoginForm}>Log-In</button>
          <button className="create" onClick={toggleCreateAccountForm}>Create Account</button>
        </div>
      )}

      {showLoginForm && (
        <ApolloProvider client={client}>
          <Login onLoginSuccess={() => {
            setIsLoggedIn(true);
            setShowLoginForm(false);
          }} />
        </ApolloProvider>
      )}

      {showCreateAccountForm && (
        <div>
          <form onSubmit={handleCreateAccountSubmit}>
            <div>
              <label>Email:</label>
            </div>
            <div>
              <input type="email" required />
            </div>
            <div>
              <label>Password:</label>
            </div>
            <div>
              <input type="password" required />
            </div>
            <div>
              <label>Confirm Password:</label>
            </div>
            <div>
              <input type="password" required />
            </div>
            <button type="submit">Create Account</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
