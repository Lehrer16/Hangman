import { UserLogin } from "../interfaces/UserLogin";

//this function is responsible for sending a POST request to the /auth/login
const login = async (userInfo: UserLogin) => {
    try {
        // 

    } catch (err) {
        console.log('Error from user login: ', err);
        return Promise.reject('Could not fetch user info');
    }
}