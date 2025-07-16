import { getReceiverContract } from "@/contract/main";
import { fetchLandlordProfile } from "@/features/landlord/profile/landlordProfileThunk";
import { fetchTenantProfile } from "@/features/tenant/profile/tenantProfileThunk";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchUserWithdraw = createAsyncThunk(
    "withdraw/fetchUserWithdraw",
    async ({amount}, { rejectWithValue, dispatch }) => {
        try {
            const contract = await getReceiverContract();
            const withdraw = await contract.userWithdraw(amount);
            await withdraw.wait();
            toast.success("withdrawn successfully");
            dispatch(fetchLandlordProfile());
            dispatch(fetchTenantProfile());
            console.log("withdrawn successfully");
            return true;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
