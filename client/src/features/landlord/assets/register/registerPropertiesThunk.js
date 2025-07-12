import { getReceiverContract } from "@/contract/main";
import { fetchReturnAllProperties } from "@/features/public/view/propertyThunk";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchRegisterProperties = createAsyncThunk(
    "regProperty/fetchRegisterProperties",
    async ({location, name, amount}, { rejectWithValue, dispatch }) => {
        try {
            const contract = await getReceiverContract();
            const property = await contract.registerProperties(location, name, amount);
            await property.wait();
            toast.success("Property registered successfully");
            dispatch(fetchReturnAllProperties())
            return true;
        } catch (error) {
            console.log(error.message)
            return rejectWithValue(error.message);
        }
    }

)
