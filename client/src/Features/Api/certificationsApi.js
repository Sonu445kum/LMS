import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CERTIFICATION_API = "http://localhost:9000/api/v1/certifications";

export const certificationApi = createApi({
  reducerPath: "certificationApi",
  tagTypes: ["Refetch_Creator_Certification", "Refetch_Lecture"],
  baseQuery: fetchBaseQuery({
    baseUrl: CERTIFICATION_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCertification: builder.mutation({
      query: ({ name, description, issuer, category,file }) => ({
        url: "/add",
        method: "POST",
        body: { name, description, issuer, category ,file},
      }),
      invalidatesTags: ["Refetch_Creator_Certification"],
    }),

    getSearchCertification: builder.query({
      query: ({ searchQuery = "", categories = [], sortByPrice = "" }) => {
        const params = new URLSearchParams();

        if (searchQuery?.trim()) params.append("searchQuery", searchQuery.trim());
        if (categories.length > 0) params.append("categories", categories.join(","));
        if (sortByPrice) params.append("sort", sortByPrice);

        const paramStr = params.toString();
        return {
          url: paramStr ? `/search?${paramStr}` : "/search",
          method: "GET",
        };
      },
    }),

    getPublishedCertifications: builder.query({
      query: () => ({
        url: "/published-certifications",
        method: "GET",
      }),
    }),

    getCreatorCertifications: builder.query({
      query: () => ({ url: "", method: "GET" }),
      providesTags: ["Refetch_Creator_Certification"],
    }),

    getAllCertifications: builder.query({
      query: () => ({
        url: "/all", // 🔁 Adjust this if needed
        method: "GET",
      }),
    }),

    getCertificationById: builder.query({
      query: (id) => `/${id}`, // Fix: Use only the ID
    }),

    editCertification: builder.mutation({
      query: ({ certificationId, formData }) => ({
        url: `/${certificationId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Certification"],
    }),

    deleteCertification: builder.mutation({
      query: (certificationId) => ({
        url: `/${certificationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Creator_Certification"],
    }),

    publishCertification: builder.mutation({
      query: ({ certificationId, query }) => ({
        url: `/${certificationId}?publish=${query}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useCreateCertificationMutation,
  useGetSearchCertificationQuery,
  useGetPublishedCertificationsQuery,
  useGetCreatorCertificationsQuery,
  useGetAllCertificationsQuery, // ✅ <- Exported here
  useEditCertificationMutation,
  useGetCertificationByIdQuery,
  useDeleteCertificationMutation,
  usePublishCertificationMutation,
} = certificationApi;
