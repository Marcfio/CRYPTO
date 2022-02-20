const BonusToken = artifacts.require("BonusToken.sol");
const LiquidityMigrator = artifacts.require("LiquidityMigrator.sol");
const Migrations = artifacts.require("Migrations");

module.exports = async function (deployer) {
  await deployer.deploy(BonusToken);
  const bonusToken = await BonusToken.Deployed();

  const routerAddress = '';
  const pairAddress = '';
  const routerForkAddress = '';
  const pairForkAddress = '';

  await deployer.deploy(BonusToken,
    LiquidityMigrator,
    routerAddress,
    pairAddress,
    routerForkAddress,
    pairForkAddress,
    bonusToken.address
  );
  const liquidityMigrator = await LiquidityMigrator.deployed();
  await bonusToken.setLiquidator(liquidityMigrator.address);


};
