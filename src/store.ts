import { configureStore } from "@reduxjs/toolkit"; 
 // eslint-disable-next-line import/no-unresolved
 import postSlice from "./PostSlice";


const store = configureStore({
    reducer: {
        postSlice,
    }
});

export default store;

