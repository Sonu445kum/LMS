import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/ui/Navbar/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-50 dark:bg-[#0f172a] overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="mt-30 flex-grow flex flex-col justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-grow"
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