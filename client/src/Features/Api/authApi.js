 
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { userLoggedIn } from "../authSlice";

// const USER_API = "http://localhost:9000/api/v1/user/";

// export const authApi = createApi({
//     reducerPath: "authApi",
//     baseQuery: fetchBaseQuery({
//         baseUrl: USER_API,
//         credentials: "include",  
//     }),
//     endpoints: (builder) => ({
//         registerUser: builder.mutation({
//             query: (inputData) => ({
//                 url: "register",
//                 method: "POST",
//                 body: inputData,
//                 headers: { "Content-Type": "application/json" },  // ✅ Fix: Ensure JSON headers
//             }),
//         }),

//         loginUser: builder.mutation({
//             query: (inputData) => ({
//                 url: "login",
//                 method: "POST",
//                 body: inputData,
//                 headers: { "Content-Type": "application/json" },  // ✅ Fix: Ensure JSON headers
//             }),

//             async onQueryStarted(_, { queryFulfilled, dispatch }) {
//                 try {
//                     const { data } = await queryFulfilled;
//                     if (data?.user) {
//                         dispatch(userLoggedIn({ user: data.user }));  // ✅ Fix: Check if `data.user` exists
//                         console.log("User logged in:", data.user);
//                     } else {
//                         console.error("Login response missing user data", data);
//                     }
//                 } catch (error) {
//                     console.error("Login error:", error?.error?.data || error);
//                 }
//             },
           
//             loadUser: builder.query({
//                 query: () => ({
//                     url: "profile",
//                     method: "GET",
//                 }),
//             }),
//         }),
//     }),
// });

// export const { useRegisterUserMutation, useLoginUserMutation,useLoadUserQuery} = authApi;

// new code 
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../authSlice";

const USER_API = "http://localhost:9000/api/v1/user/";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include",  
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "register",
                method: "POST",
                body: inputData,
                headers: { "Content-Type": "application/json" }, 
            }),
        }),

        loginUser: builder.mutation({
            query: (inputData) => ({
                url: "login",
                method: "POST",
                body: inputData,
                headers: { "Content-Type": "application/json" },
            }),

            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.user) {
                        dispatch(userLoggedIn({ user: data.user }));
                        console.log("User logged in:", data.user);
                    } else {
                        console.error("Login response missing user data", data);
                    }
                } catch (error) {
                    console.error("Login error:", error?.error?.data || error);
                }
            },
        }),

        // ✅ Fixed: Moved `loadUser` query outside of `loginUser`
        loadUser: builder.query({
            query: () => ({
                url: "profile",
                method: "GET",
            }),
        }),
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useLoadUserQuery } = authApi;

