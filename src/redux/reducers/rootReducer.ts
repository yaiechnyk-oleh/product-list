import { combineReducers } from '@reduxjs/toolkit';
import productReducer from '../actions/productActions';
import commentReducer from "./commentReducer";

const rootReducer = combineReducers({
    products: productReducer,
    comments: commentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
