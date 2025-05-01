// import React from "react";
// import { useGetAllCertificationsQuery } from "../Features/Api/certificationsApi";

// const CertificationsList = () => {
//   const { data: certifications, isLoading, isError } = useGetAllCertificationsQuery();

//   if (isLoading) return <p>Loading certifications...</p>;
//   if (isError) return <p>Failed to load certifications.</p>;

//   return (
//     <div>
//       <h1>Certifications</h1>
//       <ul>
//         {certifications.map((cert) => (
//           <li key={cert._id}>
//             <h2>{cert.title}</h2>
//             <p>{cert.description}</p>
//             <p>Category: {cert.category}</p>
//             <p>Price: ${cert.price}</p>
//             <p>Duration: {cert.duration}</p>
//             <img src={cert.image} alt={cert.title} style={{ width: "200px" }} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CertificationsList;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CertificationsList = () => {
  const { id } = useParams(); // Get the certification ID from the URL
  const [certification, setCertification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertification = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:9000/api/v1/certifications/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch certification details");
        }
        const data = await response.json();
        setCertification(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertification();
  }, [id]);

  if (loading) {
    return <p>Loading certification details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!certification) {
    return <p>Certification not found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{certification.title}</h1>
      <img
        src={`http://localhost:9000${certification.image}`}
        alt={certification.title}
        className="w-full h-60 object-cover rounded-md mb-4"
      />
      <p className="text-lg text-gray-600 mb-4">{certification.description}</p>
      <p className="text-lg font-bold text-gray-800">Category: {certification.category}</p>
      <p className="text-lg font-bold text-gray-800">Price: ${certification.price}</p>
      <p className="text-lg font-bold text-gray-800">Duration: {certification.duration}</p>
    </div>
  );
};

export default CertificationsList;