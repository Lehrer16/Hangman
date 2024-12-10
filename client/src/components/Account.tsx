import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Account = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [addUser] = useMutation(ADD_USER);

    const handleChange = (e: ChangeEvent) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormState({
            ...formState,
            [name]: value,
        })
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(formState);

        try {
            const { data } = await addUser({
                variables: { input: { ...formState } },
            });
            Auth.login(data.addUser.token)
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <div>
            <h2>Account Page</h2>
            <p>Welcome {formState.email}!</p>

            <form onSubmit={handleFormSubmit}>
                <input
                    className='form-input'
                    placeholder='Enter username'
                    name='name'
                    type='text'
                    value={formState.email}
                    onChange={handleChange}
                />

                <input
                    className='form-input'
                    placeholder='Enter email'
                    name='email'
                    type='email'
                    value={formState.email}
                    onChange={handleChange}
                />

                <input
                    className='form-input'
                    placeholder='*******'
                    name='password'
                    type='password'
                    value={formState.password}
                    onChange={handleChange}
                />

                <button
                    className='button'
                    style={{ cursor: 'pointer' }}
                    type='submit'
                >
                    Submit
                </button>
            </form>


        </div>
    )
}

export default Account;