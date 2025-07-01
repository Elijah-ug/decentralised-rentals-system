// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract ImmovableRental{
    struct Tenant {
        address user;
        uint256 balance;
        bool hasActiveRent;
        bool isRegistered;
    }
    mapping(address => Tenant) public tenant;
// property struct
    struct Properties{
            uint256 propertyId;
            address landlord;
            string location;
            uint256 rentAmount;
            address requestedBy;
            bool isOccupied;
            bool tenantRequest;
            bool stillOwned;
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
    // rental
    struct Rental {
    uint256 rentalId;
    address landlord;
    address tenant;
    uint256 startDate;
    uint256 endDate;
    bool isSigned;
     bool isReleased;
     }
     mapping(address => Rental) public rental;
     uint256 public indexedRental;
     // ======== EVENTS =======
     event LandlordRegistered(address indexed landlord, bool isRegistered);
     event TenantRegistered(address indexed tenant, bool isRegistered);
     event PropertydRegistered(address indexed landlord, address indexed tenant, bool isRegistered);
     event PropertydRequested(address indexed tenant, uint256 propertyId);
     // ========= MODIFIERS ======
     modifier onlyLandlord(){
        require(landlordProfile[msg.sender].user == msg.sender, "Not Landlord");
        _;
     }
     modifier onlyTenant(){
        require(tenant[msg.sender].user == msg.sender, "Not a registered tenant");
        require(tenant[msg.sender].isRegistered, "Tenant not registered");
        _;
     }
     // ========== LOGICAL FUNCTIONS ======
    //  **** registering landlord ****
     function registerLandLord() external {
        require(!landlordProfile[msg.sender].isRegistered, "Landlord already registered");
        landlordProfile[msg.sender] = Landlord({
            user: msg.sender,
            balance: 0,
            isRegistered: true,
            hasProperties: false
        });
     }
     // *** Registering prperties ***
     function registerProperties(string memory _location, uint256 _amount) external onlyLandlord {
        require(landlordProfile[msg.sender].isRegistered, "Not a registered Landlord");
        //creating a unique key for the property
        bytes32 propertyKey = keccak256(abi.encodePacked(msg.sender, _location, _amount));
        require(!isPropertyRegistered[propertyKey], "Property Already registered");

        Properties memory newProperty = Properties({
            propertyId: indexedProperty,
            landlord: msg.sender,
            location: _location,
            rentAmount: _amount,
            requestedBy: address(0),
            isOccupied: false,
            tenantRequest: false,
            stillOwned: true,
            isRegistered: true
        });
        listedProperties.push(newProperty);
        isPropertyRegistered[propertyKey] = true;
        indexedProperty ++;
     }

    //  *** registering a tenant ****
    function registerTenant() external{
        require(!tenant[msg.sender].isRegistered, "Tenant alredy registered");
        require(!tenant[msg.sender].hasActiveRent, "Tenant Already registered");
        tenant[msg.sender] = Tenant({
            user: msg.sender,
            balance: 0,
            hasActiveRent: false,
            isRegistered: true
        });
    }
    //  *** registering a rental ***
    function registerRental(address _tenant) external onlyLandlord {
        require(!rental[msg.sender].isSigned, "Rental already signed");
        require(landlordProfile[msg.sender].isRegistered, "Not a registered Landlord");
        require(tenant[_tenant].isRegistered, "Not a registered tenant");

        rental[msg.sender] = Rental({
            rentalId: indexedRental,
            landlord: msg.sender,
            tenant: _tenant,
            startDate: 0,
            endDate: 0,
            isSigned: false,
            isReleased: true
        });
        indexedRental ++;
    }

    // **** tenants function to request rental *****
    function propertyRentRequest(uint256 _propertyId) external onlyTenant{
        require(_propertyId < listedProperties.length, "Invalid Propert Id");
        Properties memory property = listedProperties[_propertyId];

        require(!property.isOccupied, "Property already occupied");
        require(!property.tenantRequest, "Already requested");

        property.tenantRequest = true;
        property.requestedBy = msg.sender;
        emit PropertydRequested(msg.sender, _propertyId);
    }
    // ***** Landlord function to sign rental ****
     // ========== AUTOMATION =========
     // ========== VIEW FUNCTIONS ======
     // =========== FALLBACK ========
     receive() external payable{}

}
