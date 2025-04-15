// import React, { useState } from "react";
// import { useCreateCertificationMutation } from "../../../Features/Api/certificationsApi";
// import { useNavigate } from "react-router-dom";

// const AddCertifications = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     issuer: "",
//     category: "",
//   });
//   const [createCertification] = useCreateCertificationMutation();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createCertification(formData);
//       alert("Certification created successfully!");
//       navigate("/admin/certifications");
//     } catch (error) {
//       console.error("Failed to create certification:", error);
//       alert("Failed to create certification.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Add Certification</h1>
//       <div className="mb-4">
//         <label htmlFor="name" className="block mb-2">Name:</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           className="border p-2 w-full"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="description" className="block mb-2">Description:</label>
//         <textarea
//           id="description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           className="border p-2 w-full"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="issuer" className="block mb-2">Issuer:</label>
//         <input
//           type="text"
//           id="issuer"
//           name="issuer"
//           value={formData.issuer}
//           onChange={handleChange}
//           className="border p-2 w-full"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="category" className="block mb-2">Category:</label>
//         <input
//           type="text"
//           id="category"
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           className="border p-2 w-full"
//           required
//         />
//       </div>
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//         Create
//       </button>
//     </form>
//   );
// };

// export default AddCertifications;

// new code
import React, { useState } from "react";
import { useCreateCertificationMutation } from "../../../Features/Api/certificationsApi";
import { useNavigate } from "react-router-dom";

const AddCertifications = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    issuer: "",
    category: "",
    file: null, // Add file field
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
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("issuer", formData.issuer);
      formDataToSend.append("category", formData.category);
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
        Create
      </button>
    </form>
  );
};

export default AddCertifications;