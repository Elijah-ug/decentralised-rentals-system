import { getReceiverContract } from "@/contract/main";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReceiptThunk = createAsyncThunk(
    "receipt/fetchReceiptThunk",
    async (_, { rejectWithValue }) => {
        try {
            const contract = await getReceiverContract();
            const receipts = await contract.returnRental();
            const userReceipt = {
                propertyId: receipts[0].toString(),
                startDate: new Date(Number(receipts[1]) * 1000).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }),
                endDate: new Date(Number(receipts[2]) * 1000).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }),
                landlord: receipts[3],
                tenant: receipts[4],
                isSigned: receipts[5],
                isReleased: receipts[6],
                isPaid: receipts[7],
                propertyName: receipts[8],
            }
            console.log(userReceipt);
            return userReceipt;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
