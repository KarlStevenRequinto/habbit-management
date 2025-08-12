import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer, { type CategoriesState } from "./slice/categorySlice";
import { loadState, saveState } from "./persist";

const PERSIST_KEY = "hm:redux:v1";

type Persisted = {
    categories: CategoriesState;
};

const preloadedState = loadState<Persisted>(PERSIST_KEY);

export const store = configureStore({
    reducer: {
        // Add your reducers here
        categories: categoriesReducer,
    },
    preloadedState,
});

store.subscribe(() => {
    const state = store.getState();
    const payload: Persisted = { categories: state.categories };
    saveState(PERSIST_KEY, payload);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
