import React, { useState } from "react";
import { useCreateCertificationMutation } from "../../../Features/Api/certificationsApi";
import { useNavigate } from "react-router-dom";

const AddCertifications = () => {
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
    file: null, // File upload field
  });

  const [createCertification] = useCreateCertificationMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] }); // Update file field
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData(); // Use FormData for file upload
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("tag", formData.tag);
      formDataToSend.append("tagColor", formData.tagColor);
      formDataToSend.append("introduction", formData.introduction);
      formDataToSend.append("key_1", formData.key_1);
      formDataToSend.append("key_2", formData.key_2);
      formDataToSend.append("key_3", formData.key_3);
      formDataToSend.append("Course_Benefits", formData.Course_Benefits);
      formDataToSend.append("Course_Benefits_2", formData.Course_Benefits_2);
      formDataToSend.append("Course_Benefits_3", formData.Course_Benefits_3);
      formDataToSend.append("Road_map", formData.Road_map);
      formDataToSend.append("file", formData.file); // Append file

      await createCertification(formDataToSend); // Send FormData
      alert("Certification created successfully!");
      navigate("/admin/certifications");
    } catch (error) {
      console.error("Failed to create certification:", error);
      alert("Failed to create certification.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4" encType="multipart/form-data">
      <h1 className="text-2xl font-bold mb-4">Add Certification</h1>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
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
          rows="3"
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
      <div className="mb-4">
        <label htmlFor="price" className="block mb-2">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="duration" className="block mb-2">Duration:</label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="tag" className="block mb-2">Tag:</label>
        <input
          type="text"
          id="tag"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="tagColor" className="block mb-2">Tag Color:</label>
        <input
          type="text"
          id="tagColor"
          name="tagColor"
          value={formData.tagColor}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="file" className="block mb-2">Upload File:</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Certification
      </button>
    </form>
  );
};

export default AddCertifications;