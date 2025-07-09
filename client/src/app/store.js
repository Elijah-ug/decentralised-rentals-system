import { configureStore } from "@reduxjs/toolkit";
import connectWalletSliceReducer from "../auth/walletSlice"
import landlordProfileSliceReducer from "../features/landlord/profile/landlordProfileSlice";
import tenantProfileSliceReducer from "../features/tenant/profile/tenantProfileSlice";
import fetchedPropertySliceReducer from "../features/public/view/propertySlice";
import landlordReceiptsliceReducer from "../features/public/receipts/receiptSlice";

export const store = configureStore({
    reducer: {
        "wallet": connectWalletSliceReducer,
        "landlord": landlordProfileSliceReducer,
        "tenant": tenantProfileSliceReducer,
        "allProperties": fetchedPropertySliceReducer,
        "receipt": landlordReceiptsliceReducer,
    }
})
