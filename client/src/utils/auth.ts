import {jwtDecode} from 'jwt-decode';

interface UserToken {
  name: string;
  exp: number;
}

// Create a new class to instantiate for a user
class AuthService {
  // Get user data
  getProfile() {
    return jwtDecode(this.getToken() || '');
  }

  // Check if user is logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // Handwaiving here
  }

  // Check if token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<UserToken>(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      
      return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken: string) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/hangman'); // Redirect to hangman route
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // This will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
