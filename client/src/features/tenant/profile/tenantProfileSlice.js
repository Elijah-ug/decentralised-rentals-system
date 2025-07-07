import { createSlice } from "@reduxjs/toolkit";
import { fetchTenantProfile } from "./tenantProfileThunk";

const initialState = {
    tenantProf: {
        user: null,
        balance: "0",
        hasActiveRent: false,
        isRegistered: false,
    },
    loading: false,
    error: null
}

const tenantProfileSlice = createSlice({
    name: "tenant",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTenantProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTenantProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.tenantProf = action.payload;
            })
            .addCase(fetchTenantProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Undefined Error happened"
            })
    }
})
export default tenantProfileSlice.reducer;
