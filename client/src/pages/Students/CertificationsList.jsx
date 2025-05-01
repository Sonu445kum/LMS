import React, { useState } from "react";
import { useGetAllCertificationsQuery } from "../../Features/Api/certificationsApi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const CertificationsList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch certifications using RTK Query
  const { data: certifications = [], isLoading, error } = useGetAllCertificationsQuery();

  // Group certifications by category
  const groupedCertifications = certifications.reduce((acc, cert) => {
    if (!acc[cert.category]) {
      acc[cert.category] = [];
    }
    acc[cert.category].push(cert);
    return acc;
  }, {});

  // Filter certifications based on the search query
  const filteredCertifications = Object.keys(groupedCertifications).reduce((acc, category) => {
    const filtered = groupedCertifications[category].filter((cert) =>
      cert.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    console.error("API Error:", error);
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        Failed to load certifications. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10 -mt-20">
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-extrabold text-blue-500 mb-6 px-4 leading-tight">
        All Certifications – Grouped by Category
      </h1>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search certifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Display Certifications by Category */}
        {Object.keys(filteredCertifications).length > 0 ? (
          Object.keys(filteredCertifications).map((category) => (
            <div key={category} className="mb-10">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCertifications[category].map((cert) => (
                  <motion.div
                    key={cert._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={`/certifications/${cert._id}`}
                      className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full"
                    >
                      <div className="p-6 h-full flex flex-col">
                        <div className="flex gap-4 mb-4">
                          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                            {cert.image ? (
                              <img
                              src={`http://localhost:9000${cert.image}`} // Prepend the backend server URL
                              alt={cert.title}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/placeholder-image.png"; // Add a placeholder image
                              }}
                            />
                            ) : (
                              <div className="text-gray-400 text-xs text-center p-2">No Image</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                              {cert.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                          {cert.description}
                        </p>
                        <div className="flex justify-between items-center mt-auto">
                          <span className="text-lg font-semibold text-blue-600">${cert.price}</span>
                          <span className="text-sm text-gray-500">{cert.duration}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="mx-auto max-w-md">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No certifications found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationsList;