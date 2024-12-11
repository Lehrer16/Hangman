import { UserLogin } from "../interfaces/UserLogin";

// This function is responsible for sending a POST request to the /auth/login
const login = async (userInfo: UserLogin) => {
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo), // Use userInfo here
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        return data; // Return the fetched user info
    } catch (err) {
        console.log('Error from user login: ', err);
        return Promise.reject('Could not fetch user info');
    }
}

export { login };
