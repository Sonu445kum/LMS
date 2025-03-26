import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Features/authSlice.js";
import { authApi } from "@/Features/Api/authApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
});

export default rootReducer;