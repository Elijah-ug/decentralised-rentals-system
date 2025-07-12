import { getReceiverContract } from "@/contract/main";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchTenantProfile } from "../profile/tenantProfileThunk";

export const fetchTenantDeposit = createAsyncThunk(
    "deposit/fetchTenantDeposit",
    async ({amount}, { rejectWithValue, dispatch }) => {
        try {
            const contract = await getReceiverContract();
            const deposit = await contract.tenantDeposit({ value: amount });
            await deposit.wait();
            toast.success("Deposited successfully");
            dispatch(fetchTenantProfile());
            console.log("deposited");
            return true;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
