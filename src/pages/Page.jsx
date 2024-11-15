import React from "react";

const Page = () => {
  return (
    <div className="">
      <div>
        <h1 className="text-xl">{blog.title}</h1>
        <p className="text-md">{blog.content}</p>
      </div>
      <div>
        <p className="text-md text-amber-400">24 November, 2024 - 10 min</p>
      </div>
    </div>
  );
};

export default Page;

const blog = {
  title: "The Benefits of Embracing Change",
  content: `In today's rapidly evolving world, the ability to adapt and embrace change has become increasingly crucial for both personal and professional success. While change can often be daunting and uncomfortable, it presents a wealth of opportunities for growth, innovation, and self-improvement. One of the primary benefits of embracing change is the development of a flexible mindset. By becoming comfortable with the unknown and being open to new experiences, individuals can enhance their problem-solving skills, become more resilient, and better equipped to navigate the ebbs and flows of life. Change is the driving force behind innovation. When we challenge the status quo and step out of our comfort zones, we open ourselves up to fresh perspectives, novel ideas, and groundbreaking solutions. This can lead to the creation of innovative products, services, or even entire industries, ultimately transforming the way we live and work.`,
};
