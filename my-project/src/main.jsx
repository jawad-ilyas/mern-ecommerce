import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './Pages/Home/Home.jsx';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import SignUpPage from './Pages/SignUpPage/SignUpPage.jsx';
import Profile from './Components/Profile.jsx';
import ProfilePage from './Pages/ProfilePage/ProfilePage.jsx';
import { Store } from './app/Store.js';
import { Provider } from 'react-redux';
import CartPage from './Pages/CartPage/CartPage.jsx';
import CheckoutPage from './Pages/CheckoutPage/CheckoutPage.jsx';
import ProductDetailPage from './Pages/ProductDetailPage/ProductDetailPage.jsx';
import Protected from './feature/Auth/Componet/protected.js';
import PageNotFound from './Pages/PageNotFound.jsx';
import Success from './Pages/success.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/signup",
        element: <SignUpPage />
      }
      ,
      {
        path: "/profile",
        element: <Protected><ProfilePage /></Protected>
      }
      ,
      {
        path: "/cart",
        element: <Protected ><CartPage /></Protected>
      }
      ,
      {
        path: "/checkout",
        element: <Protected ><CheckoutPage /></Protected>
      }
      ,
      {
        path: "/product-detail/:id",
        element: <Protected ><ProductDetailPage /></Protected>
      }
      ,
      {
        path: "/success/:id",
        element: < ><Success /></>
      }
      ,
      {
        path: "*",
        element: <PageNotFound />
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
