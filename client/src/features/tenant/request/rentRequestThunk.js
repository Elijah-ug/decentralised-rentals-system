import { getReceiverContract } from "@/contract/main";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchTenantProfile } from "../profile/tenantProfileThunk";
import { fetchReturnAllProperties } from "@/features/public/view/propertyThunk";
import { fetchReceiptThunk } from "@/features/public/receipts/receiptThunk";

export const fetchPropertyRentRequest = createAsyncThunk(
    "request/fetchPropertyRentRequest",
    async ({propertyId}, { rejectWithValue, dispatch }) => {
        try {
            const contract = await getReceiverContract();
            const request = await contract.propertyRentRequest(propertyId);
            await request.wait();
            toast.success("Request sent")
            dispatch(fetchTenantProfile());
            dispatch(fetchReturnAllProperties());
            dispatch(fetchReceiptThunk())
            dispatch()
            return true;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
