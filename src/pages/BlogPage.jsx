import { useState } from "react";

const textColors = [
  {mainColor: "text-black", secondaryColor:"text-blue-500",label: "black"},
  {mainColor: "text-red-500", secondaryColor:"text-cyan-400",label: "red"},
  {mainColor: "text-amber-500", secondaryColor:"text-purple-500",label: "amber"},
  {mainColor: "text-blue-500", secondaryColor:"text-amber-400",label: "blue"},
  {mainColor: "text-orange-500", secondaryColor:"text-teal-500",label: "orange"},
]

const textFonts = [
  {label: "sans-serif", fontFam: "font-sans"},
  {label: "mono", fontFam: "font-mono"},
  {label: "serif", fontFam: "font-serif"},
]

const BlogPage = () => {
  const [textColor, setTextColor] = useState(textColors[0]);
  const [textFont, setTextFont] = useState(textFonts[0]);

  return (
    <div className="flex flex-col items-center p-5 m-10 rounded-md">
      <div className="flex gap-5">
        <h3>Select text color: </h3>
        {textColors.map(tColor => (
          <button key={tColor.label} onClick={() => setTextColor(tColor)}>{tColor.label}</button>
        ))}
      </div>
      <div className="flex gap-5">
        <h3>Select font: </h3>
        {textFonts.map(tFont => (
          <button key={tFont.label} onClick={() => setTextFont(tFont)}>{tFont.label}</button>
        ))}
      </div>
      <div className={`blogContainer max-w-2xl ${textColor.mainColor} ${textFont.fontFam}`}>
        <div className="mb-5">
          <h1 className="text-xl font-medium">{blog.title}</h1>
          <p className={`text-md ${textColor.secondaryColor}`}>
            {blog.dateCreated} - {blog.readTime}
          </p>
        </div>
        <p className="text-md">{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogPage;

const blog = {
  title: "The Benefits of Embracing Change",
  content: `In today's rapidly evolving world, the ability to adapt and embrace change has become increasingly crucial for both personal and professional success. While change can often be daunting and uncomfortable, it presents a wealth of opportunities for growth, innovation, and self-improvement. One of the primary benefits of embracing change is the development of a flexible mindset. By becoming comfortable with the unknown and being open to new experiences, individuals can enhance their problem-solving skills, become more resilient, and better equipped to navigate the ebbs and flows of life. Change is the driving force behind innovation. When we challenge the status quo and step out of our comfort zones, we open ourselves up to fresh perspectives, novel ideas, and groundbreaking solutions. This can lead to the creation of innovative products, services, or even entire industries, ultimately transforming the way we live and work.`,
  dateCreated: "24 November, 2024",
  readTime: "10 min",
};
