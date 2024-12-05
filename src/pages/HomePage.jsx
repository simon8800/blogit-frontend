import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../utils/formatDate";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchLatestPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3000/api/posts/latest', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
            return;
          }
          throw new Error('Failed to fetch latest posts');
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestPosts();
  }, [navigate]);

  const date = new Date();
  const formattedDate = formatDate(date);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />
      <div className="max-w-4xl mx-auto p-4">
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

        {!isLoading && !error && (
          <div className="space-y-6">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                author={post.author}
                datePublished={post.publishedAt}
              />
            ))}
            {posts.length === 0 && (
              <div className="text-center py-10 text-gray-600 bg-white rounded-lg shadow-md border border-amber-100">
                No posts found. Be the first to create one!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;