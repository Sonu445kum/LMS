import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

//base Url
const COURSE_API ="http://localhost:9000/api/v1/course";

export const courseApi =createApi({
    reducerPath: "courseApi",
    tagTypes:['Refetch_Creator_Courses'],
    baseQuery:fetchBaseQuery({
        baseUrl:COURSE_API,
        credentials:"include",
    }),
    endpoints:(builder)=>({
        createCourse:builder.mutation({
            //request
            query:({courseTitle,category})=>({
                url:"/create",
                method:"POST",
                body:{
                    courseTitle,
                    category
                },
            }),
            //response
            invalidatesTags:["Refetch_Creator_Courses"]
        }),
        //get all courses
        getCreatorCourse:builder.query({
            query:()=>({
                url:"",
                method:"GET",

            }),
            //response
            providesTags:["Refetch_Creator_Courses"]
        }),
    }),
})

//export
export const {useCreateCourseMutation,useGetCreatorCourseQuery} = courseApi;