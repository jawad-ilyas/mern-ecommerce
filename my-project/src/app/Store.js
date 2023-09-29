import { configureStore, createReducer } from '@reduxjs/toolkit';
import counterSlice from '../feature/Counter/counterSlice';
import AuthSlice from '../feature/Auth/AuthSlice';
import ProductSlice from '../feature/ProductList/ProductSlice';


export const Store = configureStore({
    reducer: {
        count: counterSlice,
        auth: AuthSlice,
        product: ProductSlice
    }
}) 