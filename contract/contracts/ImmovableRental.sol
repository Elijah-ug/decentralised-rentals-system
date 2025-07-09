// SPDX-License-Identifier: UNLICENCED
pragma solidity ^0.8.28;

import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import {Client} from "@chainlink/contracts-ccip/contracts/libraries/Client.sol";
import {CCIPReceiver} from '@chainlink/contracts-ccip/contracts/applications/CCIPReceiver.sol';
import {IRouterClient} from "@chainlink/contracts-ccip/contracts/interfaces/IRouterClient.sol";

contract ImmovableRental is AutomationCompatibleInterface, CCIPReceiver, ReentrancyGuard{

    IRouterClient public router;
    // bool public upkeepNeeded;
    struct Tenant {
        address user;
        uint256 balance;
        bool hasActiveRent;
        bool isRegistered;
    }
    mapping(address => Tenant) public tenants;
// property struct
    struct Properties{
            uint256 propertyId;
            address landlord;
            string location;
            string name;
            uint256 rentAmount;
            address requestedBy;
            bool isOccupied;
            bool tenantRequest;
            bool isRegistered;
        }
        uint256 public indexedProperty;
        Properties[] public listedProperties;
        mapping(bytes32 => bool) public isPropertyRegistered;

    struct Landlord {
        address user;
        uint256 balance;
        bool isRegistered;
        bool hasProperties;
    }
    mapping(address => Landlord) public landlordProfile;
    // TenantsReceipt
    struct TenantsReceipt {
    uint256 rentalId;
    address landlord;
    address tenant;
    uint256 propertyId; // NEW
    string propertyName; // NEW
    uint256 startDate;
    uint256 endDate;
    bool isSigned;
    bool isReleased;
    bool isPaid;
}

     mapping(uint256 => TenantsReceipt) public rentalReceipts; // propertyId => receipt

     uint256 public indexedRental;
    //  incoming payload struct
    struct CrossChainRentRequest {
    address tenant;
    uint256 propertyId;
    uint256 rentAmount;
    bool autoRequest;
    }

    address public owner;
    mapping(uint64 => mapping(address => bool)) public allowedSenderPerChain;
     // ======== EVENTS =======
     event LandlordRegistered(address indexed landlord, bool isRegistered);
     event TenantRegistered(address indexed tenant, bool isRegistered);
     event PropertyRegistered(address indexed landlord, bool isRegistered);
     event PropertyRequested(address indexed tenant, uint256 propertyId);
     event RentPaid(address indexed landlord, address indexed tenant, uint256 amount);
     event RentalSigned(address indexed landlord, address indexed tenant, uint256 rentalId);

     event CrossRentReceived(
        address indexed tenant, uint256 indexed propertyId, uint256 rentAmount, bool autoRequest
        );

     // constructor
     constructor(address _router)CCIPReceiver(_router){
        router = IRouterClient(_router);
        owner = msg.sender;
    }
     // ========= MODIFIERS ======
     modifier onlyOwner(){
        require(msg.sender == owner, "Not Landlord");
        _;
     }
     modifier onlyLandlord(){
        require(landlordProfile[msg.sender].user == msg.sender, "Not Landlord");
        _;
     }
     modifier onlyTenant(){
        require(tenants[msg.sender].user == msg.sender, "Unregistered tenant");
        require(tenants[msg.sender].isRegistered, "Tenant Unregistered");
        _;
     }
     // ========== LOGICAL FUNCTIONS ======
    //  **** registering landlord ****
     function registerLandLord() external {
        require(!landlordProfile[msg.sender].isRegistered, "Landlord registered");
        landlordProfile[msg.sender] = Landlord( msg.sender, 0, true, false);
        emit LandlordRegistered(msg.sender, true);
     }
     // *** Registering prperties ***
     function registerProperties(string memory _location, string memory _name, uint256 _amount) external onlyLandlord {
        require(landlordProfile[msg.sender].isRegistered, "Unregistered Landlord");
        //creating a unique key for the property
        bytes32 propertyKey = keccak256(abi.encodePacked(msg.sender, _location, _amount));
        require(!isPropertyRegistered[propertyKey], "Property registered");

        listedProperties.push(Properties(indexedProperty++, msg.sender, _location, _name, _amount, address(0), false, false, true));
        isPropertyRegistered[propertyKey] = true;
        landlordProfile[msg.sender].hasProperties = true;
        emit PropertyRegistered(msg.sender, true);
     }

    //  *** registering a tenant ****
    function registerTenant() external{
        require(!tenants[msg.sender].isRegistered, "Tenant registered");
        require(!tenants[msg.sender].hasActiveRent, "Tenant registered");
        tenants[msg.sender] = Tenant( msg.sender, 0, false, true );

        emit TenantRegistered(msg.sender, true);
    }

    // **** tenants function to request rental *****
    function propertyRentRequest(uint256 _propertyId) external onlyTenant{
        require(_propertyId < listedProperties.length, "Invalid Propert Id");
        Properties storage property = listedProperties[_propertyId];

        require(!property.isOccupied, "Property occupied");
        require(!property.tenantRequest, "Taken");
        require(tenants[msg.sender].balance >= property.rentAmount, "Insufficient Funds");

        property.tenantRequest = true;
        property.requestedBy = msg.sender;
        emit PropertyRequested(msg.sender, _propertyId);
    }
    // ***** Landlord function to sign rental ****
    function signRental(uint256 _durationInDays) external onlyLandlord {
    require(landlordProfile[msg.sender].isRegistered, "Unregistered Landlord");

    bool rentalCreated = false;

    for (uint i = 0; i < listedProperties.length; i++) {
        Properties storage property = listedProperties[i];

        if (
            property.landlord == msg.sender &&
            property.requestedBy != address(0) &&
            property.tenantRequest == true &&
            !property.isOccupied
        ) {
            address tenantAddr = property.requestedBy;

            require(tenants[tenantAddr].isRegistered, "Tenant Unregistered");

            rentalReceipts[property.propertyId] = TenantsReceipt({
                rentalId: indexedRental++,
                landlord: msg.sender,
                tenant: tenantAddr,
                propertyId: property.propertyId,
                propertyName: property.name,
                startDate: block.timestamp,
                endDate: block.timestamp + (_durationInDays * 1 days),
                isSigned: true,
                isReleased: false,
                isPaid: false
            });

            // Mark property & tenant state
            property.isOccupied = true;
            tenants[tenantAddr].hasActiveRent = true;

            emit RentalSigned(msg.sender, tenantAddr, indexedRental - 1);

            rentalCreated = true;
            break;
        }
    }

    require(rentalCreated, "No valid property request found");
}


//    function to automate payment
     function autoRentalPayment() public nonReentrant {
        for(uint i = 0; i < listedProperties.length; i++){
            Properties storage properties = listedProperties[i];
            TenantsReceipt storage rent = rentalReceipts[properties.propertyId];


            if(rent.isSigned && !rent.isReleased && rent.startDate > 0
             && block.timestamp > rent.startDate + 5 minutes &&
              tenants[rent.tenant].balance >= properties.rentAmount){
                rent.isReleased = true;
                // transfer the money
                tenants[rent.tenant].balance -= properties.rentAmount;
                landlordProfile[properties.landlord].balance += properties.rentAmount;
                rent.isPaid = true;
            }
            emit RentPaid(rent.landlord, rent.tenant, properties.rentAmount);
        }

     }
    // loops through all rentals (for Automation in batch)
    function checkAllTimeouts() public{
        for(uint i = 0; i < listedProperties.length; i++){
            Properties storage newProperty = listedProperties[i];

            TenantsReceipt storage newRental = rentalReceipts[newProperty.propertyId];
            address newTenant = newRental.tenant;
            if(newRental.isSigned && !newRental.isReleased && block.timestamp >= newRental.endDate){
                // reset rental
                newRental.isReleased = true;
                newRental.isSigned = false;
                newRental.tenant = address(0);
                newRental.startDate = 0;
                // reset property
                newProperty.isOccupied = false;
                newProperty.tenantRequest = false;
                newProperty.requestedBy = address(0);
                //reset tenant
                tenants[newTenant].hasActiveRent = false;

            }
        }
    }
    // ====== tenant deposit function ========
    function tenantDeposit() external payable onlyTenant nonReentrant{
        require(msg.value > 0, "Invalid Input");
        tenants[msg.sender].balance += msg.value;
    }
    // ========== withdraw ========
    function userWithdraw(uint256 _amount) external nonReentrant{
        require(_amount > 0, "Invalid amount");

        if(tenants[msg.sender].isRegistered){
            require(tenants[msg.sender].balance >= _amount, "insufficient funds ");
            tenants[msg.sender].balance -= _amount;
        }else if(landlordProfile[msg.sender].isRegistered){
            require(landlordProfile[msg.sender].balance >= _amount, "insufficient funds");
            landlordProfile[msg.sender].balance -= _amount;
        }else{
            revert("Not registered");
        }
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Withdraw failed");
    }

     // ========== AUTOMATION =========
     function checkUpkeep(bytes calldata) external view  override returns (bool upkeepNeeded, bytes memory performData) {
        upkeepNeeded = false;
        for(uint i = 0; i < listedProperties.length; i++){
            Properties storage property = listedProperties[i];
            TenantsReceipt storage rent = rentalReceipts[property.propertyId];

            // rental expired && not yet released
            if(rent.isSigned && !rent.isReleased && block.timestamp >= rent.endDate){
                upkeepNeeded = true;
                return (true, abi.encode("timeout"));
            }
            // rental needs rent payment
            if(rent.isSigned && !rent.isReleased && tenants[rent.tenant].balance >= property.rentAmount &&
             block.timestamp > (rent.startDate + 5 minutes)){
                upkeepNeeded = true;
                return(true, abi.encode("payment"));
            }
        }
        return (false, bytes(""));
     }
     function performUpkeep(bytes calldata performData) external override{
        if(keccak256(performData) == keccak256(bytes("timeout"))){
             checkAllTimeouts();
        } else if(keccak256(performData) == keccak256(bytes("payment"))){
             autoRentalPayment();
        }else{
            revert("Unknown upkeep action");
        }
     }
     // ========== VIEW FUNCTIONS ======
     function returnAllProperties() external view returns(Properties[] memory){
        return listedProperties;
     }
     function returnTenantProfiles() external view returns(Tenant memory){
        require(tenants[msg.sender].isRegistered, "Unregistered tenant");
        return tenants[msg.sender];
     }
     function returnLandlordProfile() external view returns (Landlord memory) {
        require(landlordProfile[msg.sender].isRegistered, "Unregistered landlord");
          return landlordProfile[msg.sender];
       }
      function returnRental() external view returns (TenantsReceipt memory) {
    for (uint i = 0; i < listedProperties.length; i++) {
        if (rentalReceipts[listedProperties[i].propertyId].tenant == msg.sender) {
            return rentalReceipts[listedProperties[i].propertyId];
        }
    }
    revert("No active rental found");
}

       // setting the sender
       function setSender(uint64 _chainSelector, address _sender, bool allowed) external onlyOwner {
            allowedSenderPerChain[_chainSelector][_sender] = allowed;
         }

    //    handling payments from across chain
    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
       CrossChainRentRequest memory rent = abi.decode(message.data, (CrossChainRentRequest));
       require(allowedSenderPerChain[message.sourceChainSelector][abi.decode(message.sender,
        (address))], "Unauthorized sender");

    require(listedProperties[rent.propertyId].landlord != address(0), "Invalid property");

    // Credit balance
    tenants[rent.tenant].balance += rent.rentAmount;

    // Auto-request logic
    if (rent.autoRequest) {
        Properties storage property = listedProperties[rent.propertyId];
        require(!property.isOccupied, "Already occupied");
        require(property.requestedBy == address(0), "Already requested");

        property.requestedBy = rent.tenant;
        property.tenantRequest = true;
    }

    emit CrossRentReceived(rent.tenant, rent.propertyId, rent.rentAmount, rent.autoRequest);
}

     // =========== Enable the contract to receive native ETH ========
     receive() external payable{}

}
