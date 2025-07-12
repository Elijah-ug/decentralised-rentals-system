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
                propertyId: receipts[1].toString(),
                startDate: new Date(Number(receipts[2]) * 1000).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }),
                endDate: new Date(Number(receipts[3]) * 1000).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }),
                landlord: receipts[4],
                tenant: receipts[5],
                isSigned: receipts[6],
                isReleased: receipts[7],
                isPaid: receipts[8],
                propertyName: receipts[9],
            }
            console.log(userReceipt);
            return userReceipt;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
