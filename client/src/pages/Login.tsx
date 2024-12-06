import React, { useState, FormEvent, ChangeEvent } from 'react';
import { UserLogin } from '../interfaces/UserLogin';
import { login } from '../api/authAPI';
import auth from '../utils/auth';

const Login = () => {
    //this state is used to manage the login form data
    const [loginData, setLoginData] = useState<UserLogin>({
        username: '',
        password: ''
    });

    //meant to handle the changes in the input fields
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
        ...loginData,
        [name]: value
    });
};
// handles form submission for login
const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        // calls the login API with the loginData
        const data = await login(loginData);
        // if able to login there's a call made to store the token in localStorage
        auth.login(data.token);
    } catch (err) {
        console.error('Failed to login', err);  // prints out an error in case the login fails 
    }
};

return (
    <div className='form-container'>
        <form className='form login-form' onSubmit={handleSubmit}>
            <h1>Login</h1>
            {/* This is the input field for the username */}
            <div className="form-group">
                <label>Username</label>
                <input
                    className="form-input"
                    type='text'
                    name='username'
                    value={loginData.username || ''}
                    onChange={handleChange}
                />
            </div>
            {/* This is the input field for the password */}
            <div className="form-group">
                <label>Password</label>
                <input
                    className="form-input"
                    type='password'
                    name='password'
                    value={loginData.password || ''}
                    onChange={handleChange}
                />
            </div>
            {/* Submit button */}
            <div className="form-group">
                <button className="btn btn-primary" style={{ cursor: 'pointer'}}type='submit'>Login</button>
            </div>
        </form>
    </div>

  )
};

export default Login;



