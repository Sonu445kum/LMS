import React from "react";
import { useParams } from "react-router-dom";
import { useGetCertificationByIdQuery } from "../Features/Api/certificationsApi";

const CertificationFullDetails = () => {
  const { id, category } = useParams(); // Get id and category from route params
  console.log("Certification ID:", id, "Category:", category);

  const { data, isLoading, error } = useGetCertificationByIdQuery(id); // Fetch certification details by id
  console.log("API Response:", { data, isLoading, error });

  if (!id) {
    return <p className="p-4 text-red-500">Invalid certification ID. Please try again.</p>;
  }

  if (isLoading) {
    return <p className="p-4">Loading...</p>;
  }

  if (error || !data) {
    return (
      <p className="p-4 text-red-500">
        Error loading certification. Please check your internet connection or try again later.
      </p>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{data.name}</h1>
      <img
        src={data.fileUrl || data.image?.[0]}
        alt={data.name}
        className="w-full max-w-md rounded mb-4"
      />
      <p className="text-gray-600 mb-2">{data.description}</p>
      <p>
        <strong>Issuer:</strong> {data.issuer}
      </p>
      <p>
        <strong>Category:</strong> {category}
      </p>
      <p>
        <strong>Issued Date:</strong> {new Date(data.issuedDate).toLocaleDateString()}
      </p>
    </div>
  );
};

export default CertificationFullDetails;