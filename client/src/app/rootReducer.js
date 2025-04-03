import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Features/authSlice.js";
import { authApi } from "../Features/Api/authApi.js";
import { courseApi } from "@/Features/Api/courseApi.js";

const rootReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    
});

export default rootReducer;