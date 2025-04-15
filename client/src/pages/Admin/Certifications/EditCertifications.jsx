import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCertificationByIdQuery, useEditCertificationMutation } from "../../../Features/Api/certificationsApi";

const EditCertifications = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: certification, isLoading } = useGetCertificationByIdQuery(id);
  const [editCertification] = useEditCertificationMutation();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    issuer: "",
    category: "",
  });

  useEffect(() => {
    if (certification) {
      setFormData({
        name: certification.name,
        description: certification.description,
        issuer: certification.issuer,
        category: certification.category,
      });
    }
  }, [certification]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editCertification({ certificationId: id, formData });
      alert("Certification updated successfully!");
      navigate("/admin/certifications");
    } catch (error) {
      console.error("Failed to update certification:", error);
      alert("Failed to update certification.");
    }
  };

  if (isLoading) return <p>Loading certification...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Certification</h1>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="issuer" className="block mb-2">Issuer:</label>
        <input
          type="text"
          id="issuer"
          name="issuer"
          value={formData.issuer}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block mb-2">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  );
};

export default EditCertifications;