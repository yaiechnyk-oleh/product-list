import { Product } from '../../types/productTypes';

interface ProductState {
    products: Product[];
    loading: boolean;
    error: Error | null;
}

interface ProductAction {
    type: string;
    payload: any;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null
};

function productReducer(state = initialState, action: ProductAction): ProductState {
    switch (action.type) {
        case 'FETCH_PRODUCTS_SUCCESS':
            return {
                ...state,
                products: action.payload,
                loading: false
            };
        case 'FETCH_PRODUCTS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default productReducer;
