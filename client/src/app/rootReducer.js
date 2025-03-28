import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Features/authSlice.js";
import { authApi } from "../Features/Api/authApi.js";

const rootReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    
});

export default rootReducer;