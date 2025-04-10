import { configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import { authApi } from "../Features/Api/authApi.js";
import { courseApi } from "@/Features/Api/courseApi.js";
import { purchaseApi } from "@/Features/Api/purchaseApi.js";
import { courseProgressApi } from "@/Features/Api/courseProgressApi.js";
import { certificationApi } from "@/Features/Api/certificationsApi.js";
export const appStore = configureStore({
    reducer:rootReducer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware,courseApi.middleware,purchaseApi.middleware,courseProgressApi.middleware,certificationApi.middleware),
});

//CREATE INITIALIZE APP
const initializeApp = async()=>{
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}));
}
initializeApp();