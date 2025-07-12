import { getReceiverContract } from "@/contract/main";
import { fetchReceiptThunk } from "@/features/public/receipts/receiptThunk";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchSignReceipt = createAsyncThunk(
    "sign/fetchSignReceipt",
    async ({durationInDays}, {rejectWithValue, dispatch}) => {
        try {
            const contract = await getReceiverContract();
            console.log(contract);
            const sign = await contract.signRental(durationInDays);
            await sign.wait();
            toast.success("Receipt signed Successfully!");
            dispatch(fetchReceiptThunk());
            return true;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
)
