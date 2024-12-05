import { formatDate } from "../utils/formatDate";
import { Link } from "react-router";

const BlogCard = ({ id, title, content, datePublished, author }) => {
  // Function to strip HTML tags and truncate text
  const truncateContent = (htmlContent) => {
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Get text content without HTML tags
    const textContent = tempDiv.textContent || tempDiv.innerText;
    
    // Truncate to 150 characters and add ellipsis if needed
    return textContent.length > 150 
      ? textContent.substring(0, 150) + '...'
      : textContent;
  };

  // Format the ISO date string
  const formattedDate = datePublished ? formatDate(new Date(datePublished)) : '';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-300 border border-amber-100">
      <h2 className="text-2xl font-bold text-amber-900 mb-2 hover:text-amber-700 transition-colors">{title}</h2>
      <p className="text-gray-700 mb-4">{truncateContent(content)}</p>
      <div className="flex flex-col gap-2">
        <div className="text-sm text-gray-600">
          By <span className="text-amber-600 hover:text-amber-700">{author.handle}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {formattedDate && `Published on ${formattedDate}`}
          </span>
          <Link 
            to={`/blog/${id}`}
            className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
