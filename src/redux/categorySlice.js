


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await axios.get('https://dummyjson.com/products/categories');
    return response.data;
});

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        selectedCategory: null,
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        resetCategory: (state) => {
            state.selectedCategory = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
    },
});

// Export actions
export const { setSelectedCategory, resetCategory } = categorySlice.actions;

 
export const selectCategory = (state) => state.categories.selectedCategory;
export const selectCategories = (state) => state.categories.categories;

export default categorySlice.reducer;
