const hre = require("hardhat");


async function deploy() {
    const accounts = await hre.ethers.getSigners();
    const contractOwner = accounts[0];

    const CofheSwap = await hre.ethers.getContractFactory("CofheSwap");
    const MockToken = await hre.ethers.getContractFactory("FHERC20");

    const token0 = await MockToken.connect(contractOwner).deploy("Cofhe", "COFHE");
    await token0.waitForDeployment();
    const token1 = await MockToken.connect(contractOwner).deploy("USD Coin", "USDC");
    await token1.waitForDeployment();

    const cofheSwap = await CofheSwap.connect(contractOwner).deploy(
        await token0.getAddress(),
        await token1.getAddress()
    );
    await cofheSwap.waitForDeployment();

    console.log(`COFHE deployed to: ${await token0.getAddress()}`);
    console.log(`USDC deployed to: ${await token1.getAddress()}`);
    console.log(`CofheSwap deployed to: ${await cofheSwap.getAddress()}`);

}

deploy().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
