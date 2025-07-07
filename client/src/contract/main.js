import { ethers } from "ethers"
import contractABI from "../abi/ImmovableRental.json"
import { ImmovableRentalAddress } from "../assets/addresses";

const getProvider = () => {
    if (window.ethereum) {
        return new ethers.BrowserProvider(window.ethereum);
    } else {
        throw new Error("Metamask is not installed")
    }
}
const getSigner = async () => {
    const provider = getProvider()
    await provider.send("eth_requestAccounts", []);
    return provider.getSigner()
}
const getReceiverContract = async () => {
    try {
        const signer = await getSigner();
        const contract = new ethers.Contract(ImmovableRentalAddress, contractABI.abi, signer);
        console.log(contract.target);
        return contract;
    } catch (error) {
        console.log(error.message)
        return;
    }
}
export {getProvider, getSigner, getReceiverContract}
