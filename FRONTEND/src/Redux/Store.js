import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./features/auth/AuthSlice";

const Store=configureStore({
    reducer:{
        auth:AuthSlice.reducer
    }
})

export default Store