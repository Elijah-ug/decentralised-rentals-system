import { getReceiverContract } from "@/contract/main";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { formatEther } from "ethers";

export const fetchLandlordProfile = createAsyncThunk(
    "landlord/fetchLandlordProfile",
    async (_, {rejectWithValue}) => {
        try {
            const contract = await getReceiverContract();
            console.log(contract)
            const tx = await contract.returnLandlordProfile();

            const profile = {
                user: tx[0],
                balance: formatEther(tx[1].toString()),
                isRegistered: tx[2],
                hasProperties: tx[3]
            }
            // console.log(profile);
            return profile;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
