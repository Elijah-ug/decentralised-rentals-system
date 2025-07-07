import { createSlice } from "@reduxjs/toolkit";
import { fetchLandlordProfile } from "./landlordProfileThunk";

const initialState = {
    profile: {
        user: null,
        balance: "0",
        isRegistered: false,
        hasProperties: false,
    },
    loading: false,
    error: null
}

const landlordProfileSlice = createSlice({
    name: "landlord",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchLandlordProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLandlordProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchLandlordProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Undefined Error happened"
            })
    }
})
export default landlordProfileSlice.reducer;
