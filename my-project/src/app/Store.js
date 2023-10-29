import { configureStore, createReducer } from '@reduxjs/toolkit';
import counterSlice from '../feature/Counter/counterSlice';
import AuthSlice from '../feature/Auth/AuthSlice';
import ProductSlice from '../feature/ProductList/ProductSlice';
import CartSlice from '../feature/Cart/CartSlice';
import OrderSlice from '../feature/Checkout/CheckoutSlice';
import UserSlice from '../feature/User/UserSlice';
import  OrdersSlice  from '../feature/Orders/OrderSlice';


export const Store = configureStore({
    reducer: {
        auth: AuthSlice,
        product: ProductSlice,
        cart: CartSlice,
        checkOut: OrderSlice,
        User: UserSlice,
        Order:OrdersSlice    
    }
}) 