// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import ProductDetails from './components/ProductDetails/ProductDetails';

const App: React.FC = () => {
    return (
        <Router>
            <div className="container mx-auto px-4">
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
