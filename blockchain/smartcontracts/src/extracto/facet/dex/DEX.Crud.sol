// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {DEXStorageLib} from "../../diamond/libraries/Lib.DEX.sol";
import {Utils} from "./DEX.Utils.sol";

abstract contract Crud is Utils {
    constructor() Utils() {}

    function sellOrders() external view returns (DEXStorageLib.Order[] memory) {
        return filterOrderBy(DEXStorageLib.OrderType.Sell);
    }

    function buyOrders() external view returns (DEXStorageLib.Order[] memory) {
        return filterOrderBy(DEXStorageLib.OrderType.Buy);
    }
}
