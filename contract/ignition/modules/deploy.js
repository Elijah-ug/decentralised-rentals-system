const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ImmovableRentalModule", (m) => {
  const receiverContract = m.contract("ImmovableRental");

  return { receiverContract };
});
