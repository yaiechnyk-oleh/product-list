// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store'; // Make sure to import store correctly
import './index.css';

const container = document.getElementById('root') as HTMLElement; // Ensure the container is not null
const root = createRoot(container); // Create a root for the app

// Render the App within the Provider which provides the Redux store
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
