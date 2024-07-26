// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@fhenixprotocol/contracts/FHE.sol";
import "@fhenixprotocol/contracts/experimental/token/FHERC20/FHERC20.sol";

contract CofheSwap {
    FHERC20 public token0;
    FHERC20 public token1;

    euint32 internal reserve0;
    euint32 internal reserve1;
    euint32 internal threshold;

    euint64 internal slope;

    constructor(FHERC20 _token0, FHERC20 _token1) {
        token0 = FHERC20(_token0);
        token1 = FHERC20(_token1);
    }

    function provideLiquidity(inEuint32 calldata encryptedAmount0, inEuint32 calldata encryptedAmount1) external {
        // TODO: add remove liquidity function
        euint32 amount0 = FHE.asEuint32(encryptedAmount0);
        euint32 amount1 = FHE.asEuint32(encryptedAmount1);
        reserve0 = FHE.add(reserve0, amount0);
        reserve1 = FHE.add(reserve1, amount1);
        threshold = FHE.div(FHE.add(reserve0, reserve1), FHE.asEuint32(4));
        token0.transferEncrypted(msg.sender, FHE.asEuint128(amount0));
        token1.transferEncrypted(msg.sender, FHE.asEuint128(amount1));
    }

    function swap(inEuint32 calldata encryptedAmount, address to) external {
        // swap, for now only in one direction
        euint32 amountIn = FHE.asEuint32(encryptedAmount);
        euint32 k = FHE.add(reserve0, reserve1);
        euint32 amountOutF2 = FHE.sub(FHE.mul(FHE.asEuint32(3), k), FHE.mul(FHE.asEuint32(9), amountIn));
        euint32 amountOut = FHE.select(FHE.lt(reserve1, threshold), amountIn, amountOutF2);

        reserve0 = FHE.add(reserve0, amountIn);
        reserve1 = FHE.sub(reserve1, amountOut);
        token0.transferFromEncrypted(msg.sender, address(this), FHE.asEuint128(amountIn));
        token1.transferEncrypted(to, FHE.asEuint128(amountOut));
    }
}
