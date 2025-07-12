import { getReceiverContract } from "@/contract/main";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatEther } from "ethers";

export const fetchTenantProfile = createAsyncThunk(
    "tenant/fetchTenantProfile",
    async (_, {rejectWithValue}) => {
        try {
            const contract = await getReceiverContract();
            console.log(contract)
            const tx = await contract.returnTenantProfiles();

            const tenantProf = {
                balance: formatEther(tx[0].toString()),
                user: tx[1],
                hasActiveRent: tx[2],
                isRegistered: tx[3]
            }
            // console.log(tenantProf);
            return tenantProf;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
