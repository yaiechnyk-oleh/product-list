import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                {children}
                <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
