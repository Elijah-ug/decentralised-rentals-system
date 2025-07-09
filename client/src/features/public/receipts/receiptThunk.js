import { getReceiverContract } from "@/contract/main";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReceiptThunk = createAsyncThunk(
    "receipt/fetchReceiptThunk",
    async (_, { rejectWithValue }) => {
        try {
            const contract = await getReceiverContract();
            const receipts = await contract.returnRental();
            const userReceipt = {
                rentalId: receipts[0].toString(),
                landlord: receipts[1],
                tenant: receipts[2],
                propertyId: receipts[3].toString(),
                propertyName: receipts[4],
                startDate: new Date(Number(receipts[5]) * 1000).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }),

                endDate: new Date(Number(receipts[6]) * 1000).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }),

                isSigned: receipts[7],
                isReleased: receipts[8]
            }
            console.log(userReceipt);
            return userReceipt;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
