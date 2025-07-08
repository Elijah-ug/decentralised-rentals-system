import { getReceiverContract } from "@/contract/main";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTenantDeposit = createAsyncThunk(
    "deposit/fetchTenantDeposit",
    async ({amount}, { rejectWithValue }) => {
        try {
            const contract = await getReceiverContract();
            const deposit = await contract.tenantDeposit({ value: amount });
            await deposit.wait();
            toast.success("Deposited successfully");
            console.log("deposited");
            return true;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
