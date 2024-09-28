
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    updateSearch: (state, action) => {
      return action.payload;  
    },
    resetSearch: () => {
      return ''; 
    },
  },
});

export const { updateSearch, resetSearch } = searchSlice.actions;

export default searchSlice.reducer;
