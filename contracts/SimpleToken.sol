// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhenixprotocol/contracts/FHE.sol";
import {FHERC20} from "@fhenixprotocol/contracts/experimental/token/FHERC20/FHERC20.sol";

contract SimpleToken is FHERC20 {
    constructor(string memory name, string memory symbol) FHERC20(name, symbol) {}

    function mintEncrypted(inEuint128 calldata encryptedAmount) external {
        _mintEncrypted(msg.sender, encryptedAmount);
    }

    function mint(uint256 amount) external {
        _mint(msg.sender, amount);
    }
}
