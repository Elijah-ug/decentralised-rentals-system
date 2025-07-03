const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ArbitrumSepoliaSenderModule", (m) => {
  const ArbitrumRouter = "0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165";
  const BaseChainSelector = BigInt("10344971235874465080")

  const ARBITRUM_ROUTER = m.getParameter("router", ArbitrumRouter);
  const BASE_SELECTOR = m.getParameter("destinationChainSelector", BaseChainSelector);
  const SenderContract = m.contract("ArbitrumSepoliaSender", [BASE_SELECTOR, ARBITRUM_ROUTER]);

  return { SenderContract };
});
