import { getReceiverContract } from "@/contract/main";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchUserWithdraw = createAsyncThunk(
    "withdraw/fetchUserWithdraw",
    async ({amount}, { rejectWithValue }) => {
        try {
            const contract = await getReceiverContract();
            const withdraw = await contract.userWithdraw(amount);
            await withdraw.wait();
            toast.success("withdrawn successfully");
            console.log("withdrawn successfully");

            return true;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
