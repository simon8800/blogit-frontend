import { useState, useEffect } from "react";
import { Link } from "react-router";
import BlogCard from "../components/BlogCard";

const LandingPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3000/api/posts/latest?limit=3');

        if (!response.ok) {
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
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Blogit</h1>
          <p className="text-xl mb-8">Share your thoughts with the world.</p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-800 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Latest Posts Section */}
      <div className="max-w-4xl mx-auto p-4 mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Latest Posts</h2>
        
        {isLoading && (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600 mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-center py-10">
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
              <div className="text-center py-10 text-gray-600">
                No posts available yet. Be the first to create one!
              </div>
            )}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-16 mt-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Choose Blogit?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-amber-600 mb-3">Rich Text Editor</h3>
              <p className="text-gray-600">Create beautiful posts with our powerful and intuitive editor.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-amber-600 mb-3">Customizable Reading</h3>
              <p className="text-gray-600">Personalize your reading experience with custom fonts and colors.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-amber-600 mb-3">Simple Publishing</h3>
              <p className="text-gray-600">Write, preview, and publish with just a few clicks.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
