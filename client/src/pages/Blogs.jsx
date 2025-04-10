import React from "react";
import { motion } from "framer-motion";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Programming Languages to Learn in 2025",
    excerpt:
      "Explore the most in-demand programming languages that will dominate the job market in the coming years.",
    image: "https://th.bing.com/th/id/OIP.y-RoM0YfKpI1__HNt-9fHQHaEK?rs=1&pid=ImgDetMain",
    author: "Jane Doe",
    date: "April 5, 2025",
  },
  {
    id: 2,
    title: "How to Stay Productive While Learning Online",
    excerpt:
      "Master the art of self-discipline and create effective study habits for success in online learning.",
    image: "https://thecomputerbasics.com/wp-content/uploads/2024/04/How-to-Stay-Productive-and-Avoid-Distractions-Online-.webp",
    author: "John Smith",
    date: "March 28, 2025",
  },
  {
    id: 3,
    title: "AI in Education: Revolutionizing E-Learning Platforms",
    excerpt:
      "Discover how artificial intelligence is transforming the way we learn and teach.",
    image: "https://th.bing.com/th/id/OIP.Wzmnydzs3ZvfCRyGnQ4TowHaEJ?rs=1&pid=ImgDetMain",
    author: "Alice Johnson",
    date: "March 15, 2025",
  },
];

const Blogs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.h1
        className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📚 Our Latest Blog Posts
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-8">
        {blogPosts.map((post, idx) => (
          <motion.div
            key={post.id}
            className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                By <span className="font-semibold">{post.author}</span> on {post.date}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
