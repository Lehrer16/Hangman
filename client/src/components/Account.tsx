import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Link } from "react-router-dom";

const Account = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [addUser] = useMutation(ADD_USER);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const { data } = await addUser({
                variables: { input: { ...formState } },
            });
            Auth.login(data.addUser.token);
        } catch (error) {
            console.error("Error creating account:", error);
        }
    };

    const handleUsernameChange = () => {
        setFormState({
            ...formState,
            name: newUsername,
        });
        setIsEditing(false);
    };

    return (
        <div className="accountPage">
            <Link to="/hangman">
                <button id="returnToGame">Back to the game</button>
            </Link>

            <h2>Account Page</h2>
            <p>Welcome, {formState.name || formState.email || 'Guest'}!</p>

            <form onSubmit={handleFormSubmit}>
                <input
                    className="form-input"
                    placeholder="Enter username"
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                />

                <input
                    className="form-input"
                    placeholder="Enter email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                />

                <input
                    className="form-input"
                    placeholder="*******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                />

                <button
                    className="button"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                >
                    Submit
                </button>
            </form>

            {isEditing ? (
                <div>
                    <h3>Enter New Username:</h3>
                    <div>
                        <input
                            type="text"
                            placeholder="New Username"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    </div>

                    <button onClick={handleUsernameChange}>Save Username</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => setIsEditing(true)}>Change Username</button>
                </div>
            )}
        </div>
    );
};

export default Account;
