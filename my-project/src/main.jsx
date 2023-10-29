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
import OrdersInfoPage from './Pages/OrdersInfoPage/OrdersInfoPage.jsx';
import Logout from './Components/Logout.jsx';
import AdminHome from './Pages/AdminHome/AdminHome.jsx';
import ProtectedAdmin from './feature/Auth/Componet/protectedAdmin.js';
import AdminProductDetailPage from './Pages/AdminProductDetailPage/AdminProductDetailPage.jsx';
import AddProduct from './feature/Admin/component/AddProduct.jsx';
import AdminOrderDetail from './feature/Admin/component/AdminOrderDetail.jsx';
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
        path: "/admin",
        element: <ProtectedAdmin><AdminHome /></ProtectedAdmin>
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
        path: "/addProduct",
        element: <ProtectedAdmin><AddProduct /></ProtectedAdmin>
      }
      ,
      {
        path: "/addProduct/edit/:id",
        element: <ProtectedAdmin><AddProduct /></ProtectedAdmin>
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
        path: "/admin/product-detail/:id",
        element: <ProtectedAdmin ><AdminProductDetailPage /></ProtectedAdmin>
      }
      ,
      {
        path: "/success/:id",
        element: < ><Success /></>
      },
      {
        path: "/myOrders",
        element: <OrdersInfoPage />
      }
      ,
      {
        path: "/logout",
        element: <Logout />
      }
      ,
      {
        path: "/adminOrder",
        element: <AdminOrderDetail />
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
