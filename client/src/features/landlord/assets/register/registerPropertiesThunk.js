const { getReceiverContract } = require("@/contract/main");
const { createAsyncThunk } = require("@reduxjs/toolkit");
const { toast } = require("react-toastify");

const fetchRegisterProperties = createAsyncThunk(
    "regProperty/fetchRegisterProperties",
    async ({location, name, amount}, { rejectWithValue }) => {
        try {
            const contract = await getReceiverContract();
            const property = contract.registerProperties(location, name, amount);
            await property.wait();
            toast.success("Property registered successfully");
        } catch (error) {
            console.log(error.message)
            return rejectWithValue(error.message);
        }
    }

)
