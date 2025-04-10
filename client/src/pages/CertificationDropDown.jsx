import { useNavigate } from "react-router-dom";

export default function CertificationDropdown({ certifications = [] }) {
  const navigate = useNavigate();

  const handleViewMore = (id) => {
    console.log("Inside ViewMore");
    navigate(`/course/show-details/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {certifications.length > 0 ? (
        certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <h4 className="font-semibold text-lg text-gray-900">{cert.title}</h4>
            <p className="text-gray-600 text-sm mt-1 line-clamp-3">{cert.description}</p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-blue-600 font-medium">{cert.provider}</span>
              <button
                onClick={() => handleViewMore(cert.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm transition-all"
              >
                View More
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 col-span-full text-center">No certifications found.</p>
      )}
    </div>
  );
}
