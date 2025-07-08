import { getReceiverContract } from "@/contract/main";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchRegisterProperties = createAsyncThunk(
    "regProperty/fetchRegisterProperties",
    async ({location, name, amount}, { rejectWithValue }) => {
        try {
            const contract = await getReceiverContract();
            const property = contract.registerProperties(location, name, amount);
            await property.wait();
            toast.success("Property registered successfully");
            return true;
        } catch (error) {
            console.log(error.message)
            return rejectWithValue(error.message);
        }
    }

)
