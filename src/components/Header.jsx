import { Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { isTokenExpired } from '../utils/auth';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired(token)) {
      setIsLoggedIn(true);
      fetch('http://localhost:3000/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            handleLogout('Your session has expired. Please log in again.');
          }
          throw new Error('Failed to fetch user info');
        }
        return response.json();
      })
      .then(data => {
        setUserEmail(data.email);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
    } else if (token) {
      handleLogout('Your session has expired. Please log in again.');
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate]);

  const handleLogout = (message = null) => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserEmail('');
    if (message) {
      alert(message);
    }
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-amber-200">
      <div>
        <Link 
          to={isLoggedIn ? '/home' : '/'} 
          className="font-semibold text-xl hover:text-amber-700 transition-colors"
        >
          Blog It
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <>
            <Link 
              to="/dashboard"
              className="hover:text-amber-700 transition-colors"
            >
              My Posts
            </Link>
            <Link 
              to="/editor"
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Create Post
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">{userEmail}</span>
              <button 
                onClick={handleLogout}
                className="hover:text-amber-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link 
              to="/login"
              className="hover:text-amber-700 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/register"
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;