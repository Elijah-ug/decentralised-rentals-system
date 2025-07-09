import { createSlice } from "@reduxjs/toolkit";
import { fetchReceiptThunk } from "./receiptThunk";

const initialState = {
    userReceipt: {
        rentalId: null,
        landlord: null,
        tenant: null,
        propertyId: null,
        propertyName: null,
        startDate: null,
        endDate: null,
        isSigned: false,
        isReleased: false
    },
    loading: false,
    error: null
}

const landlordReceiptslice = createSlice({
    name: "receipt",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchReceiptThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReceiptThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.userReceipt = action.payload;
            })
            .addCase(fetchReceiptThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Undefined Error happened"
            })
    }
})
export default landlordReceiptslice.reducer;
