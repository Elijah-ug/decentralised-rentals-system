# 🏠 ImmovableRental Smart Contract

A decentralized rental management system for real estate properties (houses, apartments, shops, etc.)  It allows **landlords** to list properties, **tenants** to request and rent them, and uses **Chainlink Automation** to handle auto-payments and contract expiration logic.

---

## 🔑 Key Features

- 🧱 **Property Registration** (Landlords)
- 🧍‍♂️ **Landlord Registration**
🧍‍♂️ **Tenant Registration** and **Rental Request**
- 💰 **Deposit-Based Payment System** (Tenants deposit into the smart contract)
- 🔁 **Auto Rent Collection** using Chainlink Automation
The rent amount is auto deducted after the landlord signs the receipt
- ⏳ **Timeout-based Reset** for expired rentals
When the renting time ends, the state is auto reset, and the property will be available for renting
- 🔓 **Withdrawals** for both landlords and tenants
- 📜 **On-chain Receipts** for rental agreements
The receipts are auto generated after the Landlord just signs the property id and the renting period
- ⚠️ **Upkeep logic** that determines rent collection vs timeout reset
For automation, I used chainlink automation
---

## ⚙️ Tech Stack
- **Solidity v^0.8.28**
- **Chainlink Automation (Keepers)**
- **OpenZeppelin ReentrancyGuard**
- **Frontend: React, Ethers.js**

## What I'm planing to add in the near future
- **Movable properties e.g computers, Boda, etc**
- **Deploying it on some other EVM compatible chains**
- **Payments in stable coins**

## @@ Then the following stage
- **Then in the final stage, to add onramp and offRanp to support local currecies**
- **Making it accessible in other countries**

 ## NOTE
 **I'm actively seeking for funding**
