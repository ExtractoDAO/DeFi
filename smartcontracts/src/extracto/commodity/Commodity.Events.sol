// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

abstract contract EEvents {
    /*//////////////////////////////////////////////////////////////
                               EVENTS
    //////////////////////////////////////////////////////////////*/

    event FutureCreated(address indexed future, uint256 indexed amount, address indexed investor, uint256 locktime);

    event TokensMinted(uint256 indexed amount, address indexed investor);

    event WeightPriceUpdated(uint256 newPrice);

    event OnSale(uint256 totalSupply);
}
