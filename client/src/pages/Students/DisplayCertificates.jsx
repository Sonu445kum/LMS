import React from "react";
import { useGetAllCertificationsQuery } from "../../Features/Api/certificationsApi";
import { Link } from "react-router-dom";

const DisplayCertificates = () => {
  const { data, isLoading, isError } = useGetAllCertificationsQuery();
  console.log("API Response:", data);

  if (isLoading) return <p>Loading certifications...</p>;
  if (isError) return <p>Failed to load certifications.</p>;
  if (!data || data.length === 0) return <p>No certifications available.</p>;

  const getImageUrl = (imagePath) => {
    // Ensure the image path is correct
    if (!imagePath) return "/placeholder.png"; // Local placeholder image
    return imagePath.startsWith("http")
      ? imagePath
      : `http://localhost:9000${imagePath}`;
  };

  return (
    <div className="mb-10 container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Certifications</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((cert) => (
          <div
            key={cert._id}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
          >
            <img
              src={getImageUrl(cert.image)}
              alt={cert.title}
              className="w-full h-40 object-cover rounded-md mb-4"
              onError={(e) => {
                console.log("Image load error for:", cert.image);
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = "/placeholder.png"; // Local placeholder image
              }}
            />
            <h2 className="text-lg font-semibold">{cert.title}</h2>
            <p className="text-sm text-gray-600">{cert.category}</p>
            <p className="text-sm text-gray-800 font-bold">${cert.price}</p>
            <p className="text-sm text-gray-600">{cert.duration}</p>
            <p className="text-sm text-gray-600">{cert.description}</p>
            <Link
              to={`/certifications/${cert._id}`}
              className="text-blue-500 hover:underline mt-2 block"
            >
              View More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayCertificates;