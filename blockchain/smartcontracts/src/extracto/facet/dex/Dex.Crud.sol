// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {DexStorageLib} from "../../diamond/libraries/Lib.Dex.sol";
import {Utils} from "./DEX.Utils.sol";

abstract contract Crud is Utils {
    constructor() Utils() {}

    function sellOrders() external view returns (DexStorageLib.Order[] memory) {
        return filterOrderBy(DexStorageLib.OrderType.Sell);
    }

    function buyOrders() external view returns (DexStorageLib.Order[] memory) {
        return filterOrderBy(DexStorageLib.OrderType.Buy);
    }
}
