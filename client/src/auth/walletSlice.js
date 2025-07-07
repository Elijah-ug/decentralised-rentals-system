import { createSlice } from "@reduxjs/toolkit";
import { connectWallet } from "./walletThunk";
import { autoConnectWallet } from "./autoConnectWalletThunk";

const initialState = {
    address: null,
    chainId: null,
    loading: false,
    error: null
}
const connectWalletSlice = createSlice({
    name: "wallet",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(connectWallet.pending, (state) => {
                state.loading = true;
            })
            .addCase(connectWallet.fulfilled, (state, action) => {
                state.loading = false;
                state.address = action.payload.address;
                state.chainId = action.payload.chainId;
            })
            .addCase(connectWallet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(autoConnectWallet.pending, (state) => {
                state.loading = true;
            })
            .addCase(autoConnectWallet.fulfilled, (state, action) => {
                state.loading = false;
                state.address = action.payload.address;
                state.chainId = action.payload.chainId;
            })
            .addCase(autoConnectWallet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})
export default connectWalletSlice.reducer;
