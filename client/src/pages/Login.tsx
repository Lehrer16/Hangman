import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

interface LoginProps {
    onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
    // State to manage the login form data
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login] = useMutation(LOGIN_USER);
    const navigate = useNavigate(); // Initialize navigate

    // Handle changes in the input fields
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // Handle form submission for login
    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
            onLoginSuccess();
            navigate('/hangman'); // Redirect to /hangman route
        } catch (e) {
            console.error(e);
        }

        // Clear form values
        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <div className='form-container'>
            <form className='form login-form' onSubmit={handleFormSubmit}>
                <h1>Login</h1>
                {/* Input field for the email */}
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        className='form-input'
                        type='text'
                        name='email'
                        value={formState.email}
                        onChange={handleChange}
                    />
                </div>
                {/* Input field for the password */}
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        className='form-input'
                        type='password'
                        name='password'
                        value={formState.password}
                        onChange={handleChange}
                    />
                </div>
                {/* Submit button */}
                <div className='form-group'>
                    <button className='btn btn-primary' style={{ cursor: 'pointer' }} type='submit'>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
