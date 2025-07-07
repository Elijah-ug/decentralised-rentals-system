import { createAsyncThunk } from "@reduxjs/toolkit";

export const autoConnectWallet = createAsyncThunk(
    "autoConnect/autoConnectWallet",
    async (_, { rejectWithValue }) => {

        try {
            if (!window.ethereum) return console.log("Metamask not detected");

            const baseSepoliaChainId = "0x14a34";
            const network = await window.ethereum.request({ method: "eth_chainId" });
            if (network !== baseSepoliaChainId) {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{chainId: baseSepoliaChainId}]
                })
            }
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            if (accounts.length === 0) {
                return rejectWithValue("Wallet not connected");
            }
            return {address: accounts[0], chainId: network}
        } catch (error) {
            console.log(error.message)
        }
    }
)
