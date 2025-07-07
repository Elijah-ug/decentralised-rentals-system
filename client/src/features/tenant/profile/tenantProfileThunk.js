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
                user: tx[0],
                balance: formatEther(tx[1].toString()),
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
