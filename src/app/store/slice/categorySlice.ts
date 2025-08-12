import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

export type Category = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

type CategoriesState = {
    items: Category[];
};

const initialState: CategoriesState = {
    items: [
        // optional seed
        { id: "groceries1", name: "Groceries1", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: "groceries2", name: "Groceries2", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: "groceries3", name: "Groceries3", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: "groceries4", name: "Groceries4", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: "groceries5", name: "Groceries5", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ],
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCategory: {
            prepare: (name: string) => {
                const now = new Date().toISOString();
                return { payload: { id: nanoid(), name: name.trim(), createdAt: now, updatedAt: now } };
            },
            reducer: (state, action: PayloadAction<Category>) => {
                const exists = state.items.some((c) => c.name.toLowerCase() === action.payload.name.toLowerCase());
                if (!exists) state.items.push(action.payload);
            },
        },
        updateCategoryName: (state, action: PayloadAction<{ id: string; name: string }>) => {
            const c = state.items.find((x) => x.id === action.payload.id);
            if (c) {
                c.name = action.payload.name.trim();
                c.updatedAt = new Date().toISOString();
            }
        },
        deleteCategory: (state, action: PayloadAction<{ id: string }>) => {
            state.items = state.items.filter((c) => c.id !== action.payload.id);
        },
        upsertMany: (state, action: PayloadAction<Category[]>) => {
            // handy if you load from an API later
            const byId = new Map(state.items.map((c) => [c.id, c]));
            for (const incoming of action.payload) {
                byId.set(incoming.id, incoming);
            }
            state.items = Array.from(byId.values());
        },
        clearAll: (state) => {
            state.items = [];
        },
    },
});

export const { addCategory, updateCategoryName, deleteCategory, upsertMany, clearAll } = categoriesSlice.actions;

export default categoriesSlice.reducer;

export const selectCategories = (s: { categories: CategoriesState }) => s.categories.items;

export const selectCategoriesSorted = (s: { categories: CategoriesState }) => [...s.categories.items].sort((a, b) => a.name.localeCompare(b.name));
