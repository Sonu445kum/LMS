

// new code
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { certificates } from "@/assets/frontend_assets/assets";
import { FaCheckCircle, FaStar, FaAngleDown, FaAngleUp } from "react-icons/fa";

const categoryMapping = {
  project_management: "pro_management",
  information_security: "information_security",
  quality_management: "quality_management",
  networking_certifications: "networking_certifications",
  cyber_security: "cyber_security",
  scrum_agile: "scrum_agile",
  microsoft_certifications: "microsoft_certifications",
  amazon_web_services: "amazon_web_services",
};

const CertificationFullDetails = () => {
  const { category, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedCertification, setSelectedCertification] = useState(null);
  const [showFaq, setShowFaq] = useState(false);

  useEffect(() => {
    setLoading(true);

    const mappedCategory = categoryMapping[category];
    const selectedCategory =
      certificates.find((cat) => Object.keys(cat).includes(mappedCategory))?.[mappedCategory] || [];

    const foundCertification = selectedCategory.find((cert) => cert.id === id);
    setSelectedCertification(foundCertification);

    setTimeout(() => setLoading(false), 1200); // simulate fetch delay
  }, [category, id]);

  if (loading) {
    return (
      <div className="p-6 text-center text-blue-600">
        <div className="animate-pulse text-lg">Loading Certification Details...</div>
        <div className="w-2/3 mx-auto h-2 bg-blue-300 rounded mt-4"></div>
      </div>
    );
  }

  if (!selectedCertification) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>No certification found for the selected category and ID.</p>
        <p className="mt-2 text-sm text-gray-500">Please check the URL or go back to the Certifications page.</p>
      </div>
    );
  }

  return (
    <div className="-mt-10 mb-10 p-6 max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">{selectedCertification.title}</h1>

      <img
        src={selectedCertification.image?.[0]}
        alt={selectedCertification.title}
        className="w-full max-h-[350px] object-contain mb-6 rounded-lg shadow-md"
      />

      <p className="text-gray-700 text-lg mb-4">{selectedCertification.description}</p>

      {/* Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-gray-800 text-md">
        <div><strong>Price:</strong> ${selectedCertification.price}</div>
        <div><strong>Duration:</strong> {selectedCertification.duration}</div>
        <div><strong>Level:</strong> Beginner – Intermediate</div>
        <div><strong>Certification Type:</strong> Industry-recognized</div>
      </div>

      {/* Skills You’ll Learn */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">Skills You’ll Learn</h2>
        <div className="flex flex-wrap gap-3">
          {selectedCertification.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Introduction */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">Introduction</h2>
        <p className="text-gray-700">{selectedCertification.introduction}</p>
      </div>

      {/* Key Highlights */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">Key Highlights</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {[selectedCertification.key_1, selectedCertification.key_2, selectedCertification.key_3].map(
            (key, idx) =>
              key && (
                <li key={idx} className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-1" /> {key}
                </li>
              )
          )}
        </ul>
      </div>

      {/* Course Benefits */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">Course Benefits</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {[selectedCertification.Course_Benefits, selectedCertification.Course_Benefits_2, selectedCertification.Course_Benefits_3].map(
            (benefit, idx) =>
              benefit && (
                <li key={idx} className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-1" /> {benefit}
                </li>
              )
          )}
        </ul>
      </div>

      {/* FAQs */}
      <div className="mb-6">
        <button
          onClick={() => setShowFaq(!showFaq)}
          className="text-blue-600 font-semibold flex items-center gap-2 mb-3"
        >
          {showFaq ? <FaAngleUp /> : <FaAngleDown />} FAQs
        </button>
        {showFaq && (
          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Who can take this certification?</strong>
              <p>Anyone interested in the field, from beginners to professionals.</p>
            </div>
            <div>
              <strong>Is this certification recognized globally?</strong>
              <p>Yes, our certifications are industry-approved and globally recognized.</p>
            </div>
          </div>
        )}
      </div>

      {/* Reviews */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">Student Reviews</h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-400" />
            <span className="text-sm text-gray-600 ml-2">(4.8/5 from 1,250 learners)</span>
          </div>
          <p className="text-gray-700 italic">"The content was very well explained. Helped me land my first role!"</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transform transition text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg"
          onClick={() => alert("Redirect to secure payment/checkout")}
        >
          🚀 Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CertificationFullDetails;


