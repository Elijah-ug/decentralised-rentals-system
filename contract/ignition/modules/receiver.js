const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ImmovableRentalModule", (m) => {
  const BaseRouter = "0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93"

  const BASE_ROUTER = m.getParameter("router", BaseRouter);
  const receiverContract = m.contract("ImmovableRental", [BASE_ROUTER]);

  return { receiverContract };
});
