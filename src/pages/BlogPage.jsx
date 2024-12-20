import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Header from "../components/Header";
import { formatDate } from "../utils/formatDate";
import { getAuthToken } from '../utils/auth';
import ConfirmationModal from "../components/ConfirmationModal";

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedFont, setSelectedFont] = useState('font-modern');
  const [selectedColor, setSelectedColor] = useState('text-gray-900');
  const [selectedBackground, setSelectedBackground] = useState('bg-white');
  const [userEmail, setUserEmail] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const token = getAuthToken(navigate);
    if (token) {
      fetch('http://localhost:3000/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setUserEmail(data.email);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
    }
  }, [navigate]);

  /**
   * Fetches the blog post from the API.
   * If the user is logged in, includes the authentication token to get additional data.
   * If the API request fails, sets the error state.
   * If the API request succeeds, sets the blog state with the received post.
   */
  const fetchBlog = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = getAuthToken(navigate);
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        headers
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }

      const data = await response.json();
      setBlog(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id, navigate]);

  const handlePublishToggle = async () => {
    const token = getAuthToken(navigate);
    if (!token || isUpdating) return;

    try {
      setIsUpdating(true);
      const response = await fetch(`http://localhost:3000/api/posts/${id}/publish`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      await response.json();
      await fetchBlog();
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    const token = getAuthToken(navigate);
    if (!token) return;

    try {
      setIsUpdating(true);
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      alert('Post deleted successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    } finally {
      setIsUpdating(false);
      setShowDeleteModal(false);
    }
  };

  const fonts = [
    { name: 'Modern', class: 'font-modern', description: 'Clean and contemporary' },
    { name: 'Classic', class: 'font-classic', description: 'Elegant and timeless' },
    { name: 'Book', class: 'font-book', description: 'Comfortable reading' },
  ];

  const colors = [
    { 
      name: 'Classic Dark', 
      textClass: 'text-gray-900',
      bgClass: 'bg-white',
      description: 'Traditional reading experience' 
    },
    { 
      name: 'Sepia', 
      textClass: 'text-amber-900',
      bgClass: 'bg-amber-50',
      description: 'Warm, paper-like tone' 
    },
    { 
      name: 'Slate', 
      textClass: 'text-slate-800',
      bgClass: 'bg-slate-50',
      description: 'Modern, subtle shade' 
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Header />
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Header />
        <div className="max-w-4xl mx-auto p-4">
          <div className="text-red-600 text-center py-10 bg-red-50 rounded-lg border border-red-100">
            {error}
          </div>
        </div>
      </div>
    );
  }

  const isOwner = blog && userEmail === blog.author.email;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          title="Delete Post"
          message="Are you sure you want to delete this post? This action cannot be undone."
        />
        {/* Customization Panel */}
        <div className="fixed top-24 right-4 z-10">
          <button
            onClick={() => setShowCustomization(!showCustomization)}
            className="bg-amber-600 text-white p-2 rounded-full shadow-lg hover:bg-amber-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
          
          {showCustomization && (
            <div className="mt-2 p-4 bg-white rounded-lg shadow-lg border border-amber-100 w-64">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Customize Reading</h3>
              
              {/* Font Selection */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Font Style</h4>
                {fonts.map(font => (
                  <button
                    key={font.class}
                    onClick={() => setSelectedFont(font.class)}
                    className={`block w-full text-left px-3 py-2 rounded-md mb-1 ${
                      selectedFont === font.class
                        ? 'bg-amber-100 text-amber-900'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-sm">{font.name}</div>
                    <div className="text-xs text-gray-500">{font.description}</div>
                  </button>
                ))}
              </div>
              
              {/* Color Selection */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Color Theme</h4>
                {colors.map(color => (
                  <button
                    key={color.textClass}
                    onClick={() => {
                      setSelectedColor(color.textClass);
                      setSelectedBackground(color.bgClass);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md mb-1 ${
                      selectedColor === color.textClass
                        ? 'bg-amber-100 text-amber-900'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-sm">{color.name}</div>
                    <div className="text-xs text-gray-500">{color.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Blog Content */}
        {blog && (
          <div className={`max-w-3xl mx-auto p-8 my-8 rounded-lg shadow-md ${selectedFont} ${selectedColor} ${selectedBackground}`}>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-4xl font-bold">{blog.title}</h1>
              {isOwner && (
                <div className="flex gap-2">
                  <button
                    onClick={handlePublishToggle}
                    disabled={isUpdating}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      blog.published
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isUpdating ? 'Updating...' : (blog.published ? 'Unpublish' : 'Publish')}
                  </button>
                  {!blog.published && (
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      disabled={isUpdating}
                      className={`px-4 py-2 rounded-lg transition-colors bg-red-600 text-white hover:bg-red-700 ${
                        isUpdating ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isUpdating ? 'Deleting...' : 'Delete'}
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 text-opacity-90 mb-8">
              <span>By <span className="text-amber-600">{blog.author.handle}</span></span>
              <span>•</span>
              <span>{blog.publishedAt ? formatDate(new Date(blog.publishedAt)) : 'Not published'}</span>
            </div>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
