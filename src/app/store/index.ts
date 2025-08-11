import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slice/categorySlice";

export const store = configureStore({
    reducer: {
        // Add your reducers here
        categories: categoriesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
