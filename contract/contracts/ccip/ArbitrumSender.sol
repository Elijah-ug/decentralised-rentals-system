// SPDX-License-Identifier: UNLICENCED

pragma solidity ^0.8.28;
import {Client} from "@chainlink/contracts-ccip/contracts/libraries/Client.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/contracts/interfaces/IRouterClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

contract ArbitrumSepoliaSender is Ownable{
    address public receiver;
    uint64 public destinationChainSelector;
    IRouterClient public router;
    // === Struct to send ===
    struct CrossChainRentRequest {
    address tenant;
    uint256 propertyId;
    uint256 rentAmount;
    bool autoRequest;
    }

    event RentSent(address tenant, uint256 propertyId, uint256 rentAmount, bool autoRequest);

    constructor(uint64 _selector, address _router) Ownable(msg.sender){
        destinationChainSelector = _selector;
        router = IRouterClient(_router);
    }
    function setReceiverContract(address _receiver) external{
        receiver = _receiver;
    }
    // ======= Main CCIP logic ====
    function sendRental(uint256 _propertyId) external payable{
        require(receiver != address(0), "No receiver contract set");
        require(msg.value > 0, "Invalid Amount");
        // 1. encode the payload as a struct
        CrossChainRentRequest memory payload = CrossChainRentRequest(msg.sender, _propertyId, msg.value, true);
        bytes memory messageData = abi.encode(payload);

        // 2. set message
        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver), // ABI-encoded receiver address
            data: messageData, // ABI-encoded string
            tokenAmounts: new Client.EVMTokenAmount[](0), // Empty array indicating no tokens are being sent
            extraArgs: "",
            feeToken: address(0)
                });
        // 3. Get Fee
        uint256 fee = router.getFee(destinationChainSelector, evm2AnyMessage);
        require(address(this).balance >= fee, "Not enough ETH for CCIP fee");
        // 4. Send via ccip
        router.ccipSend{value: fee}(destinationChainSelector, evm2AnyMessage);

        emit RentSent(msg.sender, _propertyId, msg.value, true);
        }
// .... deposit some ETH for gas fees
      receive() external payable{}
}
