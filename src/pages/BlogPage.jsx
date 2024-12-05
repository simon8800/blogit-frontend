import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Header from "../components/Header";
import { formatDate } from "../utils/formatDate";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedFont, setSelectedFont] = useState('font-modern');
  const [selectedColor, setSelectedColor] = useState('text-gray-900');
  const [selectedBackground, setSelectedBackground] = useState('bg-white');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:3000/api/posts/${id}`);
        
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

    fetchBlog();
  }, [id]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4">
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
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center gap-4 text-opacity-90 mb-8">
              <span>By <span className="text-amber-600">{blog.author.handle}</span></span>
              <span>•</span>
              <span>{formatDate(new Date(blog.publishedAt))}</span>
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
