class AuthService {
    
    //Checks to see if the user is logged in by retrieving the corresponding token from the local storage
    loggedIn() {
        const token = this.getToken();
        return token;
    }

    //Gets/retrieves the token from the local storage
    getToken(): string {
        const loggedUSer = localStorage.getItem('id_token') || ('email_token');
        return loggedUSer;
    }

    //Stores the token in local storage and returns the user to the homepage
    login(idToken: string) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    //Removes the token from local storage and returns the user to the homepage
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();