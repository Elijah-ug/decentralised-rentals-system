import { getReceiverContract } from "@/contract/main";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchPropertyRentRequest = createAsyncThunk(
    "request/fetchPropertyRentRequest",
    async ({propertyId}, { rejectWithValue }) => {
        try {
            const contract = await getReceiverContract();
            const request = await contract.propertyRentRequest(propertyId);
            await request.wait();
            toast.success("Request sent")
            return true;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
