import { Award, ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { certificates } from "@/assets/frontend_assets/assets";
import CertificationDropdown from "./CertificationDropdown";

const CATEGORY_TITLES = {
  pro_management: "Project Management",
  information_security: "Information Security",
  quality_management: "Quality Management",
  networking_certifications: "Networking Certifications",
  cyber_security: "Cyber Security",
  scrum_agile: "Scrum & Agile",
  microsoft_certifications: "Microsoft Certifications",
  amazon_web_services: "Amazon Web Services",
};

export default function CertificationPage({ onMouseLeave }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [certData, setCertData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("pro_management");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    setCertData(certificates || []);
  }, []);

  const handleMouseLeave = (event) => {
    const relatedTarget = event.relatedTarget;
  
    // Ensure it's a valid Node
    if (
      dropdownRef.current &&
      relatedTarget instanceof Node &&
      !dropdownRef.current.contains(relatedTarget)
    ) {
      setIsDropdownOpen(false);
      onMouseLeave?.();
    }
  };

  const certifications = certData.length > 0 ? certData[0] : {};
  const filteredCerts =
    certifications[selectedCategory]?.filter((cert) =>
      cert?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  if (!isDropdownOpen) return null;

  return (
    <div className="fixed inset-0 z-40 mt-10" onMouseLeave={handleMouseLeave}>
      {/* Overlay */}
      <div className="absolute top-[80px] inset-x-0 bottom-0 bg-black/5" />

      {/* Dropdown Box */}
      <motion.div
        ref={dropdownRef}
        className="fixed top-[80px] left-1/2 -translate-x-1/2 w-[95vw] max-w-[1400px] bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-100 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Category Section */}
            <div className="w-full md:w-64 lg:w-72 border-r border-gray-100 dark:border-slate-700 pr-4">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Categories</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                {Object.entries(CATEGORY_TITLES).map(([id, name]) => (
                  <button
                    key={id}
                    className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg text-sm font-medium transition-all w-full text-left ${
                      selectedCategory === id
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 shadow-sm ring-2 ring-blue-100 dark:ring-blue-400/30"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory(id)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Certifications Section */}
            <div className="flex-1 min-w-0">
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {CATEGORY_TITLES[selectedCategory]}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                      Browse professional certifications
                    </p>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="Search certifications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 dark:text-white"
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <CertificationDropdown certifications={filteredCerts} />
            </div>
          </div>

          {/* Footer Link */}
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700">
            <Link
              to="/student/certification"
              className="flex items-center justify-between text-blue-600 hover:underline text-sm font-semibold"
            >
              <span>Explore All Programs</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
