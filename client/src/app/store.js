import { configureStore } from "@reduxjs/toolkit";
import connectWalletSliceReducer from "../auth/walletSlice"
import landlordProfileSliceReducer from "../features/landlord/profile/landlordProfileSlice";
import tenantProfileSliceReducer from "../features/tenant/profile/tenantProfileSlice";

export const store = configureStore({
    reducer: {
        "wallet": connectWalletSliceReducer,
        "landlord": landlordProfileSliceReducer,
        "tenant": tenantProfileSliceReducer,
    }
})
