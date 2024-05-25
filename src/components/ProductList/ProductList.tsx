import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addProduct, removeProduct } from '../../redux/actions/productActions';
import { AppDispatch, RootState } from '../../redux/store';
import Modal from '../common/Modal';
import ProductItem from './ProductItem';

const ProductList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.products);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProductName, setNewProductName] = useState('');
    const [newProductCount, setNewProductCount] = useState(0);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddProduct = () => {
        if (newProductName && newProductCount > 0) {
            const newProduct = {
                id: products.length, // Generate a unique ID for the new product
                name: newProductName,
                count: newProductCount,
                imageUrl: 'default-image-url.png', // Default or placeholder image URL
                size: { width: 100, height: 100 }, // Default size
                weight: '1kg', // Default weight
                comments: [] // Default empty array for comments
            };
            dispatch(addProduct(newProduct));
            setIsModalOpen(false);
            setNewProductName('');
            setNewProductCount(0);
        }
    };

    const handleRemoveProduct = (productId: number) => {

        dispatch(removeProduct(productId));

    };

    return (
        <div className="p-4">
            <button
                className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsModalOpen(true)}
            >
                Add Product
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <input
                    type="text"
                    placeholder="Product Name"
                    className="border border-gray-300 p-2 rounded"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Count"
                    className="border border-gray-300 p-2 rounded mt-2"
                    value={newProductCount}
                    onChange={(e) => setNewProductCount(parseInt(e.target.value, 10))}
                />
                <button
                    className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddProduct}
                >
                    Add
                </button>
            </Modal>

            {products.sort((a, b) => a.name.localeCompare(b.name) || a.count - b.count).map((product) => (
                <ProductItem product={product} />
            ))}
        </div>
    );
};

export default ProductList;