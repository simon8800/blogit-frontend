import { Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by looking for token in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
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
              to="/editor"
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Create Post
            </Link>
            <button 
              onClick={handleLogout}
              className="hover:text-amber-700 transition-colors"
            >
              Logout
            </button>
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
              className="hover:text-amber-700 transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;