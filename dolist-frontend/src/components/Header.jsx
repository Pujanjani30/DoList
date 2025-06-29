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
      <div className="px-4 py-2 border-2 border-pink-500 rounded-full
      text-pink-500 font-bold hover:text-white hover:bg-pink-500 cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {getInitials(user.user_name)}
      </div>

      <Dropdown
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
      >
        <p className='mb-2'>
          <span className='font-light'>Name :</span> {user.user_name}
        </p>
        <p className='mb-5'>
          <span className='font-light'>Email :</span> {user.user_email}
        </p>
        <div>
          <button
            className='border-2 rounded-sm px-3 py-1 hover:border-pink-500 hover:text-pink-500 
                       cursor-pointer'
            onClick={() => setIsModalOpen(true)}
          >
            Logout
          </button>
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
