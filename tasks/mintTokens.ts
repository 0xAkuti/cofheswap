import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:mintTokens")
    .addPositionalParam("address", "Wallet Address")
    .setAction(async function (taskArguments: TaskArguments, hre) {
        const { fhenixjs } = hre;

        const token1Address = "0xbeb4eF1fcEa618C6ca38e3828B00f8D481EC2CC2";
        const token2Address = "0x5c93e3B7824035B375E373FaC1578D4089dcE77A";
        const swapAddress = "0xD30C778F7Fd47CCfB93Caa589195eb288FC768c8";

        const provider = hre.ethers.provider;

        const swap = await hre.ethers.getContractAt("CofheSwap", swapAddress);

        const amount1 = await fhenixjs.encrypt_uint128("1000");
        const amount2 = await fhenixjs.encrypt_uint128("500");

        const token1 = await hre.ethers.getContractAt("SimpleToken", token1Address);
        const token2 = await hre.ethers.getContractAt("SimpleToken", token2Address);


        const mint1 = await token1.mintEncrypted(amount1);
        mint1.wait();
        console.log("token1 minted");

        /*  const permitToken1 = await fhenixjs.getPermit(token1Address, taskArguments.address);
         fhenixjs.storePermit(permitToken1!);
         const permissionToken1 = fhenixjs.extractPermitPermission(permitToken1!);
 
         const permitToken2 = await fhenixjs.getPermit(token2Address, taskArguments.address);
         fhenixjs.storePermit(permitToken2!);
         const permissionToken2 = fhenixjs.extractPermitPermission(permitToken2!);
 
         const eBalance1BeforeMint = await token1.balanceOfEncrypted(
             taskArguments.address,
             permissionToken1,
         );
         const balance1BeforeMint = fhenixjs.unseal(
             token1Address,
             eBalance1BeforeMint,
         );
         console.log("token1 balance before mint: ", balance1BeforeMint);
 
         const eBalance2BeforeMint = await token2.balanceOfEncrypted(
             taskArguments.address,
             permissionToken2,
         );
         const balance2BeforeMint = fhenixjs.unseal(
             token2Address,
             eBalance2BeforeMint,
         );
         console.log("token2 balance before mint: ", balance2BeforeMint);
 
         const mint1 = await token1.mintEncrypted(amount1);
         mint1.wait();
         console.log("token1 minted");
 
         const mint2 = await token2.mintEncrypted(amount2);
         mint2.wait();
         console.log("token2 minted");
 
         const approve1 = await token1.approveEncrypted(swapAddress, amount1);
         approve1.wait();
         console.log("token 1 approved");
 
         const approve2 = await token2.approveEncrypted(swapAddress, amount2);
         approve2.wait();
 
         console.log("token 2 approved");
 
         const eBalance1BeforeLP = await token1.balanceOfEncrypted(
             taskArguments.address,
             permissionToken1,
         );
         const balance1BeforeLP = fhenixjs.unseal(token1Address, eBalance1BeforeLP);
         console.log("token1 balance before LP: ", balance1BeforeLP);
 
         const eBalance2BeforeLP = await token2.balanceOfEncrypted(
             taskArguments.address,
             permissionToken2,
         );
         const balance2BeforeLP = fhenixjs.unseal(token2Address, eBalance2BeforeLP);
         console.log("token2 balance before LP: ", balance2BeforeLP);
         console.log(`Done!`); */
    });