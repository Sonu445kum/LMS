import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CERTIFICATION_API = "http://localhost:9000/api/v1/certifications";

export const certificationApi = createApi({
  reducerPath: "certificationApi",
  tagTypes: ["Certifications"],
  baseQuery: fetchBaseQuery({
    baseUrl: CERTIFICATION_API,
    credentials: "include", // Include cookies for authentication if needed
  }),
  endpoints: (builder) => ({
    // Fetch all certifications
    getAllCertifications: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
      providesTags: ["Certifications"],
    }),

    // Fetch a single certification by ID
    getCertificationById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Certifications", id }],
    }),

    // Create a new certification (Admin only)
    createCertification: builder.mutation({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Certifications"],
    }),

    // Update a certification (Admin only)
    updateCertification: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Certifications", id }],
    }),

    // Delete a certification (Admin only)
    deleteCertification: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Certifications"],
    }),

    // Download certification syllabus
    downloadCertificationSyllabus: builder.query({
      query: (id) => ({
        url: `/download-syllabus/${id}`,
        method: "GET",
        responseHandler: (response) => response.blob(), // Handle the response as a blob
      }),
    }),
  }),
});

export const {
  useGetAllCertificationsQuery,
  useGetCertificationByIdQuery,
  useCreateCertificationMutation,
  useUpdateCertificationMutation,
  useDeleteCertificationMutation,
  useDownloadCertificationSyllabusQuery, // Export the new query hook
} = certificationApi;