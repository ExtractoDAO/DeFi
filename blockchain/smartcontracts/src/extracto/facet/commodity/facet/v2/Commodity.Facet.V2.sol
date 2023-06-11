// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {CommodityStorageLib} from "../../../../diamond/libraries/Lib.Commodity.sol";
import {ERC20} from "../../../../../token/ERC20.sol";
import {Future} from "../../../future/Future.sol";
import {MathV2} from "./Commodity.Math.V2.sol";

contract CommodityFacetV2 is MathV2 {
    event TokensMinted(uint256 amount, address investor);

    constructor() MathV2() {}

    function mintToken(uint256 commodityAmount, address investor) external nonReentrant {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();

        onlyFutures(investor, msg.sender);
        ds.contracts[msg.sender].burn = true;

        uint256 amount = calculateSellAmountYielded(commodityAmount);

        // TODO: update to ProxyCOW
        ds.cow.pay(investor, amount);

        emit TokensMinted(amount, investor);
    }
}
