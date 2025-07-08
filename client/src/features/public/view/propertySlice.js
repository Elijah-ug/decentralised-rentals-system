import { createSlice } from "@reduxjs/toolkit";
import { fetchReturnAllProperties } from "./propertyThunk";

const initialState = {
    properties: [],
    loading: false,
    error: null
}
const fetchedPropertySlice = createSlice({
    name: "allProperties",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchReturnAllProperties.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReturnAllProperties.fulfilled, (state, action) => {
                state.loading = false;
                state.properties = action.payload;
            })
            .addCase(fetchReturnAllProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
})
export default fetchedPropertySlice.reducer;
