// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {DexStorageLib} from "../../diamond/libraries/Lib.Dex.sol";
import {Auth} from "../commodity/Commodity.Auth.sol";

abstract contract Utils is Auth {
    constructor() Auth() {}

    function matchOrder(DexStorageLib.Order memory order) internal view returns (bool result, uint256 index) {
        DexStorageLib.Storage storage lib = DexStorageLib.getDexStorage();

        for (index = 0; index < lib.orderBook.length; index++) {
            DexStorageLib.Order memory orderProposal = lib.orderBook[index];

            if (orderProposal.typed == order.typed) {
                continue;
            } else {
                result = true;
                result = result && order.amount == orderProposal.amount;
                result = result && order.commodityAmount == orderProposal.commodityAmount;
                if (result) {
                    return (result, index);
                } else {
                    continue;
                }
            }
        }
        index = 0;
    }

    function filterOrdersByType(DexStorageLib.OrderType typed) internal view returns (DexStorageLib.Order[] memory) {
        DexStorageLib.Storage storage lib = DexStorageLib.getDexStorage();

        uint256 count;
        for (uint256 j = 0; j < lib.orderBook.length; j++) {
            if (lib.orderBook[j].typed == typed) {
                count++;
            }
        }

        DexStorageLib.Order[] memory orders = new DexStorageLib.Order[](count);
        uint256 i;

        for (uint256 j = 0; j < lib.orderBook.length; j++) {
            if (lib.orderBook[j].typed == typed) {
                orders[i] = lib.orderBook[j];
                i++;
            } else {
                continue;
            }
        }

        return orders;
    }

    function mountOrder(
        uint256 commodityAmount,
        uint256 amount,
        address tokenAddress,
        address future,
        address investor,
        DexStorageLib.OrderType typed,
        uint256 randNonce
    ) internal pure returns (DexStorageLib.Order memory buy) {
        bytes32 id =
            keccak256(abi.encodePacked(commodityAmount, tokenAddress, future, investor, amount, typed, randNonce));

        buy = DexStorageLib.Order(commodityAmount, amount, tokenAddress, future, investor, typed, id);
    }
}
