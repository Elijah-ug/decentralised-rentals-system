import { getReceiverContract } from "@/contract/main";
import  {createAsyncThunk}  from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchRegisterTenant = createAsyncThunk(
    "regTenant/fetchRegisterTenant",
    async (_, {rejectWithValue}) => {
        try {
            const contract = await getReceiverContract();
            const register = await contract.registerTenant();
            await register.wait();
            toast.success("Tenant Registered Successfully!")
            return true;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
