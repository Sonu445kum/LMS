// // import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// // //base Url
// // const COURSE_API ="http://localhost:9000/api/v1/course";

// // export const courseApi =createApi({
// //     reducerPath: "courseApi",
// //     tagTypes:['Refetch_Creator_Courses'],
// //     baseQuery:fetchBaseQuery({
// //         baseUrl:COURSE_API,
// //         credentials:"include",
// //     }),
// //     endpoints:(builder)=>({
// //         createCourse:builder.mutation({
// //             //request
// //             query:({courseTitle,category})=>({
// //                 url:"/create",
// //                 method:"POST",
// //                 body:{
// //                     courseTitle,
// //                     category
// //                 },
// //             }),
// //             //response
// //             invalidatesTags:["Refetch_Creator_Courses"]
// //         }),
// //         //get all courses
// //         getCreatorCourse:builder.query({
// //             query:()=>({
// //                 url:"",
// //                 method:"GET",

// //             }),
// //             //response
// //             providesTags:["Refetch_Creator_Courses"]
// //         }),
// //         //edit course
// //         editCourse:builder.mutation({
// //             query:({formData,courseId})=>({
// //                 url:`/${courseId}`,
// //                 method:"PUT",
// //                 body:formData
// //             })
// //         })
// //     }),
// // })

// // //export
// // export const {useCreateCourseMutation,useGetCreatorCourseQuery,useEditCourseMutation} = courseApi;

// // new code
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // Base URL
// const COURSE_API = "http://localhost:9000/api/v1/course";

// export const courseApi = createApi({
//   reducerPath: "courseApi",
//   tagTypes: ["Refetch_Creator_Courses", "Refetch_Lectures"],
//   baseQuery: fetchBaseQuery({
//     baseUrl: COURSE_API,
//     credentials: "include",
//   }),
//   endpoints: (builder) => ({
//     // Create Course
//     createCourse: builder.mutation({
//       query: ({ courseTitle, category }) => ({
//         url: "/create",
//         method: "POST",
//         body: {
//           courseTitle,
//           category,
//         },
//       }),
//       invalidatesTags: ["Refetch_Creator_Courses"],
//     }),

//     // getPublishedCourse
//     getPublishedCourse: builder.query({
//       query: () => ({
//         url: "/published-courses",
//         method: "GET",
//       }),
//     }),

//     // Get All Creator Courses
//     getCreatorCourse: builder.query({
//       query: () => ({
//         url: "/",
//         method: "GET",
//       }),
//       providesTags: ["Refetch_Creator_Courses"],
//     }),

//     // Edit Course
//     editCourse: builder.mutation({
//       query: ({ formData, courseId }) => ({
//         url: `/${courseId}`,
//         method: "PUT",
//         body: formData,
//       }),
//       invalidatesTags: ["Refetch_Creator_Courses"], // Optional: for auto-refetch after edit
//     }),
//     // GetCourse By Id
//     getCourseById: builder.query({
//       query: (courseId) => ({
//         url: `/${courseId}`,
//         method: "GET",
//       }),
//     }),

//     //create Lecture
//     createLecture:builder.mutation({
//         query:({lectureTitle,courseId})=>({
//             url:`/${courseId}/lecture`,
//             method:"POST",
//             body:{lectureTitle}
//         })
//     }),
//     //get all lectures
//     getCourseLecture:builder.query({
//         query:(courseId)=>({
//             url:`/${courseId}/lecture`,
//             method:"GET",
//         }),
//         providesTags:["Refetch_Lectures"]
//     }),

//     //edit lecture
//     editLecture:builder.mutation({
//       query:({lectureTitle,videoInfo,isPreviewFree,courseId,lectureId})=>({
//         url:`/${courseId}/lecture/${lectureId}`,
//         method:"POST",
//         body:{lectureTitle,videoInfo,isPreviewFree}
//       }),
//     }),

//     //delete lecture
//     removeLecture:builder.mutation({
//         query:(lectureId)=>({
//             url:`/lecture/${lectureId}`,
//             method:"DELETE",
//         }),
//         invalidatesTags:["Refetch_Lectures"]
//     }),

//     //getLectureById
//     getLectureById:builder.query({
//       query:(lectureId)=>({
//         url:`/lecture/${lectureId}`,
//         method:"GET",
//         }),
//     }),

//     //Publish Course
//     publishCourse:builder.mutation({
//       query:({courseId,query})=>({
//         url:`/${courseId}?publish=${query}`,
//         method:"PATCH",
//         }),
//     })
//   }),
// });

// // Export hooks
// export const {
//   useCreateCourseMutation,
//   useGetCreatorCourseQuery,
//   useEditCourseMutation,
//   useGetCourseByIdQuery,
//   useCreateLectureMutation,
//   useGetCourseLectureQuery,
//   useEditLectureMutation,
//   useRemoveLectureMutation,
//   useGetLectureByIdQuery,
//   usePublishCourseMutation,
//   useGetPublishedCourseQuery,
// } = courseApi;




import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:9000/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Course", "Refetch_Lecture"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),

    getSearchCourse: builder.query({
      query: ({ searchQuery = "", categories = [], sortByPrice = "" }) => {
        const params = new URLSearchParams();

        if (searchQuery?.trim()) {
          params.append("searchQuery", searchQuery.trim());
        }

        if (categories.length > 0) {
          params.append("categories", categories.join(","));
        }

        if (sortByPrice) {
          params.append("sort", sortByPrice);
        }

        const paramStr = params.toString();
        return {
          url: paramStr ? `/search?${paramStr}` : "/search",
          method: "GET",
        };
      },
    }),

    getPublishedCourse: builder.query({
      query: () => ({
        url: "/published-courses",
        method: "GET",
      }),
    }),

    getCreatorCourse: builder.query({
      query: () => ({ url: "", method: "GET" }),
      providesTags: ["Refetch_Creator_Course"],
    }),

    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),

    getCourseById: builder.query({
      query: (courseId) => ({ url: `/${courseId}`, method: "GET" }),
    }),

    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),

    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
      providesTags: ["Refetch_Lecture"],
    }),

    editLecture: builder.mutation({
      query: ({ lectureTitle, videoInfo, isPreviewFree, courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "POST",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
    }),

    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Lecture"],
    }),

    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
    }),

    publishCourse: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `/${courseId}?publish=${query}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetSearchCourseQuery,
  useGetPublishedCourseQuery,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
} = courseApi;


