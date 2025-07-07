import { getReceiverContract } from "@/contract/main";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchRegisterLandlord = createAsyncThunk(
    "regLandlord/fetchRegisterLandlord",
    async (_, { rejectWithValue }) => {
        try {
            const contract = await getReceiverContract();
            console.log(contract.target)
            const register = await contract.registerLandLord();
            await register.wait();
            console.log(register);
            toast.success("Landlord Registered Successfully!")
            return true;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
