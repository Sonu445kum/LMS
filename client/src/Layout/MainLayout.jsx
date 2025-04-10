import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/ui/Navbar/Navbar';
import Footer from '../components/Footer'; // ✅ Import Footer
import { motion } from 'framer-motion';

const MainLayout = () => {
  return (
    <div className="bg-gray-50 dark:bg-[#0f172a] min-h-screen flex flex-col justify-between">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="pt-20 px-4 md:px-8 lg:px-16 flex-grow transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
