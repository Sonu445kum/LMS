import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

//base Url
const COURSE_API ="http://localhost:9000/api/v1/course";

export const courseApi =createApi({
    reducerPath: "courseApi",
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
            })
        })
    })
})

//export
export const {useCreateCourseMutation} = courseApi;