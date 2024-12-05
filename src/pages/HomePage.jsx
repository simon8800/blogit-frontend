import { formatDate } from "../utils/formatDate";

const blogs = [
  {
    id: 1,
    title: "The Art of Minimalism",
    content: "Minimalism is a lifestyle choice that brings simplicity and clarity.",
    datePublished: "2024-12-01",
  },
  {
    id: 2,
    title: "Healthy Eating for a Busy Life",
    content: "Learn how to prepare quick and healthy meals without compromising taste.",
    datePublished: "2024-12-02",
  },
  {
    id: 3,
    title: "The Wonders of Remote Work",
    content: "Explore the benefits and challenges of working from anywhere in the world.",
    datePublished: "2024-12-03",
  },
  {
    id: 4,
    title: "The Power of Morning Routines",
    content: "Morning routines can set the tone for a productive day. Discover how.",
    datePublished: "2024-12-04",
  },
  {
    id: 5,
    title: "Traveling on a Budget",
    content: "Learn the secrets of exploring the world without emptying your wallet.",
    datePublished: "2024-12-05",
  },
  {
    id: 6,
    title: "The Evolution of Technology",
    content: "Technology has reshaped our world in unimaginable ways. Here's how.",
    datePublished: "2024-12-06",
  },
  {
    id: 7,
    title: "Finding Focus in a Distracted World",
    content: "Tips and techniques for regaining focus in our fast-paced digital lives.",
    datePublished: "2024-12-07",
  },
  {
    id: 8,
    title: "The Importance of Mental Health",
    content: "Mental health is just as important as physical health. Let’s talk about it.",
    datePublished: "2024-12-08",
  },
  {
    id: 9,
    title: "How to Start a Side Hustle",
    content: "Starting a side hustle can open up new financial and creative opportunities.",
    datePublished: "2024-12-09",
  },
  {
    id: 10,
    title: "Mastering Time Management",
    content: "Learn how to prioritize tasks and make the most out of your day.",
    datePublished: "2024-12-10",
  },
];

const HomePage = () => {
  const date = new Date();
  const formattedDate = formatDate(date);

  return (
    <div className="border-4 border-purple-200 p-2 min-h-screen">
      <div className="border-2 border-red-50">
        <h1 className="h1-style">Home</h1>
        <p>Today is {formattedDate}</p>
      </div>

      <div className="border-2 border-red-50">
        {blogs.map(blog => {
          return (<div className="border-2 border-blue-50">{blog.title}</div>)
        })}
      </div>
    </div>
  )
}

export default HomePage