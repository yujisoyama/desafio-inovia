import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        setFilter(state, { payload }) {
            return state = payload;
        }
    }
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
export const selectFilter = (state: RootState) => state.filter;