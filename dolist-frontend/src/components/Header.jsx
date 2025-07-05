import { useEffect, useState } from 'react';
import Modal from './Modal';
import Dropdown from './Dropdown';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();
    if (response.status === 200) {
      navigate('/login');
    }
  }

  const getInitials = (name) => {
    if (!name) return '';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0][0].toUpperCase();
    if (words.length === 2) return words[0][0].toUpperCase() + words[1][0].toUpperCase();
    return words[0][0].toUpperCase() + words[1][0].toUpperCase() + words[2][0].toUpperCase();
  };

  return (
    <div className='flex w-full px-4 py-2 justify-end'>
      <div className="w-12 h-12 rounded-full font-bold 
      cursor-pointer bg-gradient-to-br from-pink-400 to-purple-500 
    text-white hover:border-none transition-all duration-200 flex items-center justify-center"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {getInitials(user.user_name)}
      </div>

      <Dropdown
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
      >
        <div className="p-4 sm:p-5 min-w-64">
          {/* User Info Header */}
          <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 
                    flex items-center justify-center text-white font-semibold">
              {getInitials(user.user_name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.user_name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user.user_email}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-gray-100">
            <button
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 
                 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 
                 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 
                 focus:ring-red-200 group"
              onClick={() => setIsModalOpen(true)}
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </Dropdown>



      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Logout"
      >
        <p className='mb-4'>
          Are you sure?
        </p>
        <div className='flex items-center space-x-4 justify-end'>
          <button
            className='border px-4 py-1.5 rounded cursor-pointer'
            onClick={() => setIsModalOpen(false)}
          >
            No
          </button>
          <button
            className='border px-4 py-1.5 rounded bg-pink-500 text-white cursor-pointer'
            onClick={handleLogout}
            disabled={loading}
          >
            Yes
          </button>
        </div>
      </Modal>
    </div>

  )
}
