import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCertificationByIdQuery, useUpdateCertificationMutation } from "../../../Features/Api/certificationsApi";

const EditCertifications = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: certification, isLoading, isError } = useGetCertificationByIdQuery(id);
  const [updateCertification] = useUpdateCertificationMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    duration: "",
    tag: "",
    tagColor: "",
    introduction: "",
    key_1: "",
    key_2: "",
    key_3: "",
    Course_Benefits: "",
    Course_Benefits_2: "",
    Course_Benefits_3: "",
    Road_map: "",
  });

  useEffect(() => {
    if (certification) {
      setFormData({
        title: certification.title || "",
        description: certification.description || "",
        category: certification.category || "",
        price: certification.price || "",
        duration: certification.duration || "",
        tag: certification.tag || "",
        tagColor: certification.tagColor || "",
        introduction: certification.introduction || "",
        key_1: certification.key_1 || "",
        key_2: certification.key_2 || "",
        key_3: certification.key_3 || "",
        Course_Benefits: certification.Course_Benefits || "",
        Course_Benefits_2: certification.Course_Benefits_2 || "",
        Course_Benefits_3: certification.Course_Benefits_3 || "",
        Road_map: certification.Road_map || "",
      });
    }
  }, [certification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCertification({ id, formData }); // Pass the ID as a parameter, not in the formData
      alert("Certification updated successfully!");
      navigate("/admin/certifications");
    } catch (error) {
      console.error("Failed to update certification:", error);
      alert("Failed to update certification. Please try again.");
    }
  };

  if (isLoading) return <p>Loading certification details...</p>;
  if (isError) return <p>Failed to load certification details. Please try again later.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Certification</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows="3"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tag</label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tag Color</label>
          <input
            type="text"
            name="tagColor"
            value={formData.tagColor}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Introduction</label>
          <textarea
            name="introduction"
            value={formData.introduction}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Key 1</label>
          <input
            type="text"
            name="key_1"
            value={formData.key_1}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Key 2</label>
          <input
            type="text"
            name="key_2"
            value={formData.key_2}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Key 3</label>
          <input
            type="text"
            name="key_3"
            value={formData.key_3}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Course Benefits</label>
          <textarea
            name="Course_Benefits"
            value={formData.Course_Benefits}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Course Benefits 2</label>
          <textarea
            name="Course_Benefits_2"
            value={formData.Course_Benefits_2}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Course Benefits 3</label>
          <textarea
            name="Course_Benefits_3"
            value={formData.Course_Benefits_3}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Road Map</label>
          <textarea
            name="Road_map"
            value={formData.Road_map}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows="3"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Certification
        </button>
      </form>
    </div>
  );
};

export default EditCertifications;