import React from 'react';

const Dropdown = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute z-50 flex right-5 top-13">
      <div className="bg-white rounded border shadow-lg w-full p-6 relative animate-fadeIn">
        <div className="text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
