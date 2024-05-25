// src/components/ProductList/ProductItem.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { Product } from '../../types/productTypes';
import { removeProduct } from '../../redux/actions/productActions';

interface ProductItemProps {
    product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <div className="border p-4 rounded shadow flex justify-between items-center">
            <div>
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p>Count: {product.count}</p>
            </div>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => dispatch(removeProduct(product.id))}
            >
                Delete
            </button>
        </div>
    );
};

export default ProductItem;
