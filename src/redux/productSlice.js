
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
 
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ category, page, search }) => {
        const limit = 10;  
        const skip = (page - 1) * limit;
        let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

        if (category) {
            url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
        }

        if (search) {
            url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`;
        }

        const response = await axios.get(url);
        console.log(`Fetched products: ${url}`, response.data.products);
        return response.data.products;  
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],  
        status: 'idle',  
        page: 1,  
    },
    reducers: {
        resetProducts: (state) => {
            state.products = []; 
            state.page = 1; 
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';  
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = [...state.products, ...action.payload];  
                state.status = 'success';  
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = 'error';  
            });
    },
});

 
export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;
