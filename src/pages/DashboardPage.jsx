import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';
import { getAuthToken } from '../utils/auth';

const DashboardPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Fetches the user's posts from the API.
     * If the user is not logged in, does nothing.
     * If the API request fails, sets the error state.
     * If the API request succeeds, sets the posts state with the received posts.
     */
    const fetchUserPosts = async () => {
      const token = getAuthToken(navigate);
      if (!token) return;

      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3000/api/users/me/posts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch your posts');
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPosts();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-amber-900">My Posts</h1>
          <button
            onClick={() => navigate('/editor')}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            New Post
          </button>
        </div>

        {isLoading && (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600 mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-center py-10 bg-red-50 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        {!isLoading && !error && posts.length === 0 && (
          <div className="text-center py-10 bg-amber-50 rounded-lg border border-amber-100">
            <p className="text-amber-900 mb-4">You haven't created any posts yet.</p>
            <button
              onClick={() => navigate('/editor')}
              className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
            >
              Create your first post →
            </button>
          </div>
        )}

        <div className="space-y-6">
          {posts.map(post => (
            <BlogCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              datePublished={post.publishedAt}
              author={post.author}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
