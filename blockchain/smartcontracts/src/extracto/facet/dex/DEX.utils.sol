// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {DEXStorageLib} from "../../diamond/libraries/Lib.DEX.sol";

abstract contract Utils {
    constructor() {}

    /**
     * @notice Finds an order in the order book that matches the specified order.
     * @dev 1. This function iterates through the order book to find an order that matches the specified order.
     * @param order The order to search for in the order book.
     * @return result True if the order is found, false otherwise.
     * @return index The index of the order in the order book, or 0 if the order is not found.
     */
    function findOrder(DEXStorageLib.Order memory order) internal view returns (bool result, uint256 index) {
        DEXStorageLib.Storage storage lib = DEXStorageLib.getDEXStorage();

        for (index = 0; index < lib.orderBook.length; index++) {
            //
            if (lib.orderBook[index].typed != order.typed) {
                continue;
            } else {
                DEXStorageLib.Order storage _order = lib.orderBook[index];
                //
                result = true;
                result = result && _order.commodityAmount == order.commodityAmount;
                result = result && _order.tokenAddress == order.tokenAddress;
                result = result && _order.investor == order.investor;
                result = result && _order.amount == order.amount;
                result = result && _order.future == order.future;
                //
                if (result) {
                    return (result, index);
                } else {
                    continue;
                }
            }
        }
        //
        index = 0;
    }

    /**
     * @notice Finds an order in the order book with the specified commodity amount, amount, and order type.
     * @param commodityAmount The commodity amount of the order to find.
     * @param amount The amount of the order to find.
     * @param typed The order type of the order to find.
     * @return value Whether an order was found or not.
     * @return index The index of the found order in the order book.
     */
    function findOrder(uint256 commodityAmount, uint256 amount, DEXStorageLib.OrderType typed)
        internal
        view
        returns (bool value, uint256 index)
    {
        DEXStorageLib.Storage storage lib = DEXStorageLib.getDEXStorage();

        for (index = 0; index < lib.orderBook.length; index++) {
            //
            if (lib.orderBook[index].typed != typed) {
                continue;
            } else {
                DEXStorageLib.Order storage order = lib.orderBook[index];
                value = order.commodityAmount == commodityAmount && order.amount == amount;

                if (value) {
                    return (value, index);
                } else {
                    continue;
                }
            }
        }
        index = 0;
    }

     function filterOrderBy(DEXStorageLib.OrderType typed) internal view returns (DEXStorageLib.Order[] memory) {
        DEXStorageLib.Storage storage lib = DEXStorageLib.getDEXStorage();

        uint256 count;
        for (uint256 j = 0; j < lib.orderBook.length; j++) {
            if (lib.orderBook[j].typed == typed) {
                count++;
            }
        }

        DEXStorageLib.Order[] memory orders = new DEXStorageLib.Order[](count);
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
}
