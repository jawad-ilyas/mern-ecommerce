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
        element: <ProfilePage />
      }
      ,
      {
        path: "/cart",
        element: <CartPage />
      }
      ,
      {
        path: "/checkout",
        element: <CheckoutPage />
      }
      ,
      {
        path: "/product-detail/:id",
        element: <ProductDetailPage />
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
