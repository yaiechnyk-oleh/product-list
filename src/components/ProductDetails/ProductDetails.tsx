// src/components/ProductDetails/ProductDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, updateProduct } from '../../redux/actions/productActions';
import {AppDispatch, RootState} from '../../redux/store';
import Modal from '../common/Modal';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const productId = id ? parseInt(id, 10): null;
    const product = useSelector((state: RootState) => state.products.products.find(p => p.id === productId));
    const dispatch = useDispatch<AppDispatch>();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedCount, setEditedCount] = useState(0);

    useEffect(() => {
        if (productId !== null) {
            dispatch(fetchProduct(productId));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (product) {
            setEditedName(product.name);
            setEditedCount(product.count);
        }
    }, [product]);

    const handleUpdateProduct = () => {
        if (product) {
            dispatch(updateProduct({ ...product, name: editedName, count: editedCount }));
            setIsEditModalOpen(false);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">{product.name}</h1>
            <p>Count: {product.count}</p>
            <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsEditModalOpen(true)}
            >
                Edit
            </button>

            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                />
                <input
                    type="number"
                    value={editedCount}
                    onChange={(e) => setEditedCount(parseInt(e.target.value, 10))}
                    className="border border-gray-300 p-2 rounded mt-2"
                />
                <button
                    className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleUpdateProduct}
                >
                    Update
                </button>
            </Modal>
        </div>
    );
};

export default ProductDetails;
