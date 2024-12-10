import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App'
import Hangman from './pages/Hangman'
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Account from './components/Account';
import Hiscores from './pages/Hiscores';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },

      {
        path: '/hangman',
        element: <Hangman />
      },
      {
        path: '/account',
        element: <Account />
      },
      {
        path: '/hi-scores',
        element: <Hiscores />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
