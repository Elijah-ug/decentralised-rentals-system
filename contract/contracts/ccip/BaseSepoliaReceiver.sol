// SPDX-License-Identifier: UNLICENCED
pragma solidity ^0.8.28;

import {Client} from "@chainlink/contracts-ccip/contracts/libraries/Client.sol";
import {CCIPReceiver} from '@chainlink/contracts-ccip/contracts/applications/CCIPReceiver.sol';

 contract BaseSepoliaReceiver is CCIPReceiver{

    // Incoming rent payload struct
    struct CrossChainRentRequest {
        uint256 propertyId;
        uint256 rentAmount;
        address tenant;
        bool autoRequest;
    }
    address public onlyOwner;
    // Minimal property model (can be merged later)
    struct Property {
        address landlord;
        address requestedBy;
        bool tenantRequest;
        bool isOccupied;
    }
   mapping(uint256 => Property) public listedProperties;
   mapping(address => uint256) public tenantBalances;

   mapping(uint64 => mapping(address => bool)) public allowedSenderPerChain;

    event CrossRentReceived(
        address indexed tenant, uint256 indexed propertyId, uint256 amount, bool autoRequest
        );
        // ===== constructor =====
        constructor(address _router)CCIPReceiver(_router){
        onlyOwner = msg.sender;
    }
// ======= sender setter function ======
function setSender(uint64 _chainSelector, address _sender, bool allowed) external{
    require(msg.sender == onlyOwner, "Not authorised");
    allowedSenderPerChain[_chainSelector][_sender] = allowed;
}
// ccip receiver
function _ccipReceive(Client.Any2EVMMessage memory message ) internal override {
    // decoding the sender address
    address decodedSender = abi.decode(message.sender, (address));
    require(allowedSenderPerChain[message.sourceChainSelector][decodedSender], "Invalid sender from this chain");

    // decode the incoming message
    CrossChainRentRequest memory rent = abi.decode(message.data, (CrossChainRentRequest));
    require(listedProperties[rent.propertyId].landlord != address(0), "Invalid property" );
    // store tenant's balance
    tenantBalances[rent.tenant] += rent.rentAmount;
    // auto request rent if flag is true
    if(rent.autoRequest){
        Property storage property = listedProperties[rent.propertyId];
        require(!property.isOccupied, "Property already occupied");
        require(property.requestedBy == address(0), "Property already requested");

        property.requestedBy = rent.tenant;
        property.tenantRequest = true;
    }
    emit CrossRentReceived(rent.tenant, rent.propertyId, rent.rentAmount, rent.autoRequest);
}
    // fall back
    receive() external payable{}

}
