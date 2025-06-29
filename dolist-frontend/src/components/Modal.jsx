import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <div className="bg-white rounded-xl border w-full max-w-md p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-pink-500 hover:text-pink-600 text-2xl font-bold cursor-pointer"
        >
          ×
        </button>

        {title && <h2 className="text-xl font-bold text-pink-500 mb-2">{title}</h2>}

        <div className="text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
