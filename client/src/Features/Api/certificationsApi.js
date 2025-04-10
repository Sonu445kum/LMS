import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CERTIFICATION_API = "http://localhost:9000/api/v1/certification";

export const certificationApi = createApi({
  reducerPath: "certificationApi",
  tagTypes: ["Refetch_Certification"],
  baseQuery: fetchBaseQuery({
    baseUrl: CERTIFICATION_API,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    // ✅ Create new certification
    createCertification: builder.mutation({
      query: ({ title, description, price, imageUrl, issuedBy, duration, validity }) => ({
        url: "",
        method: "POST",
        body: { title, description, price, imageUrl, issuedBy, duration, validity },
      }),
      invalidatesTags: ["Refetch_Certification"],
    }),

    // ✅ Get all certifications
    getAllCertifications: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Refetch_Certification"],
    }),

    // ✅ Get certification by ID
    getCertificationById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCertificationMutation,
  useGetAllCertificationsQuery,
  useGetCertificationByIdQuery,
} = certificationApi;
