import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice"; // Ensure to import your appSlice

const store = configureStore({
    reducer: {
        app: appSlice,
    },
});

export default store;
