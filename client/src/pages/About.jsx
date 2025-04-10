import React from "react";
import { motion } from "framer-motion";

const aboutSections = [
  {
    title: "🎯 Our Mission",
    description:
      "We aim to democratize education by offering top-notch online courses that empower individuals globally. We believe in lifelong learning and strive to make it accessible and engaging.",
  },
  {
    title: "🌐 Who We Are",
    description:
      "We’re a team of educators, developers, and designers passionate about creating an impactful online learning experience. Our platform serves thousands of learners from diverse backgrounds.",
  },
  {
    title: "📈 Our Vision",
    description:
      "To be a global leader in digital learning by leveraging technology, AI, and expert-driven content that prepares learners for the future.",
  },
];

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-10 text-gray-800 dark:text-white"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About E-Learning LMS
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-8">
        {aboutSections.map((section, idx) => (
          <motion.div
            key={idx}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <h2 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">
              {section.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">{section.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
