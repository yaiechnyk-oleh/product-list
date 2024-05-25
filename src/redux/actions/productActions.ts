import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { Product } from '../../types/productTypes';

interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart(state) {
            state.loading = true;
        },
        fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
            console.log(state.products)
            state.loading = false;
        },
        fetchProductsFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
        fetchProductSuccess(state, action: PayloadAction<Product>) {
            const index = state.products.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            } else {
                state.products.push(action.payload);
            }
            state.loading = false;
        },
        addProduct(state, action: PayloadAction<Product>) {
            state.products.push(action.payload);
        },
        updateProduct(state, action: PayloadAction<Product>) {
            const index = state.products.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        removeProduct(state, action: PayloadAction<number>) {
            state.products = state.products.filter(p => p.id !== action.payload);
        }
    }
});

export const {
    fetchProductsStart, fetchProductsSuccess, fetchProductsFailure,
    fetchProductSuccess,addProduct, updateProduct, removeProduct
} = productsSlice.actions;

export const fetchProducts = (): AppThunk => async dispatch => {
    dispatch(fetchProductsStart());
    try {
        const response = await fetch('http://localhost:5000/products');
        const products: Product[] = await response.json();
        dispatch(fetchProductsSuccess(products));
    } catch (error) {
        dispatch(fetchProductsFailure('An unknown error occurred'));
    }
};

export const fetchProduct = (productId: number): AppThunk => async dispatch => {
    dispatch(fetchProductsStart()); // Re-use the loading action
    try {
        const response = await fetch('http://localhost:5000/products');
        const products: Product[] = await response.json();
        const product = products.find(p => p.id === productId);
        if (product) {
            dispatch(fetchProductSuccess(product)); // Dispatch success with the fetched product
        } else {
            dispatch(fetchProductsFailure('Product not found'));
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        dispatch(fetchProductsFailure(errorMessage));
    }
};

export default productsSlice.reducer;
