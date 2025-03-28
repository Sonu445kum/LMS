import { configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import { authApi } from "../Features/Api/authApi.js";
export const appStore = configureStore({
    reducer:rootReducer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware)
});