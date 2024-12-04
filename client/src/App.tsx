import { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginModal from './components/loginModal'; // Import LoginModal
import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';



const App = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [token, setToken] = useState<string>("");

    const httpLink = createHttpLink({
        uri: '/graphql',
      });
      
      // Construct request middleware that will attach the JWT token to every request as an `authorization` header
      const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = localStorage.getItem('id_token');
        // return the headers to the context so httpLink can read them
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          },
        };
      });
      
      const client = new ApolloClient({
        // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      });
      

    // const handleLoginClick = () => {
    //     setShowModal(true);
    // };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleLoginSuccess = (username: string, token: string) => {
        setUsername(username);
        setShowModal(false); // Optionally close modal after successful login
        setToken(token);
    };

    return (
        <ApolloProvider client={client}>
        {/* <Navbar /> */}
        <Outlet />
        <LoginModal 
                show={showModal} 
                handleClose={handleCloseModal} 
                onLoginSuccess={handleLoginSuccess} 
            />
      </ApolloProvider>
  
        // <Router>
        //     <Routes>
        //         <Route path="/hangman" element={<Hangman />} />
        //         <Route path="/" element={<Home />} />
        //         {/* <Route path="/account" element={<Account />} /> */}
        //     </Routes>
        // </Router>
    );
};

export default App;
