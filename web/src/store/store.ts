import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import allProductsReducer from './reducers/allProductsSlice'
import filterReducer from './reducers/filterSlice'
import shoppingCartReducer from './reducers/shoppingCartSlice'

const store = configureStore({
    reducer: {
        allProducts: allProductsReducer,
        filter: filterReducer,
        shoppingCart: shoppingCartReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, undefined, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;