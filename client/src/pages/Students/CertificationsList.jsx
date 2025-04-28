import React from "react";
import { useGetAllCertificationsQuery } from "../Features/Api/certificationsApi";

const CertificationsList = () => {
  const { data: certifications, isLoading, isError } = useGetAllCertificationsQuery();

  if (isLoading) return <p>Loading certifications...</p>;
  if (isError) return <p>Failed to load certifications.</p>;

  return (
    <div>
      <h1>Certifications</h1>
      <ul>
        {certifications.map((cert) => (
          <li key={cert._id}>
            <h2>{cert.title}</h2>
            <p>{cert.description}</p>
            <p>Category: {cert.category}</p>
            <p>Price: ${cert.price}</p>
            <p>Duration: {cert.duration}</p>
            <img src={cert.image} alt={cert.title} style={{ width: "200px" }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CertificationsList;