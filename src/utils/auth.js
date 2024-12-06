// Function to check if JWT token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

// Function to handle token expiration and logout
export const handleTokenExpiration = (navigate) => {
  localStorage.removeItem('token');
  alert('Your session has expired. Please log in again.');
  navigate('/login');
};

// Function to get token and check expiration
export const getAuthToken = (navigate) => {
  const token = localStorage.getItem('token');
  if (!token || isTokenExpired(token)) {
    handleTokenExpiration(navigate);
    return null;
  }
  return token;
};
