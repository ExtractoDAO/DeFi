// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {CommodityStorageLib} from "../../diamond/libraries/Lib.Commodity.sol";
import {DexStorageLib} from "../../diamond/libraries/Lib.Dex.sol";
import {ERC20} from "../../../token/ERC20.sol";
import {Future} from "../future/Future.sol";
import "../../../utils/math/UD60x18.sol";
import {Crud} from "./DEX.Crud.sol";

contract Dex is Crud {
    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor() Crud() {}

    ////////////////////////////////////////////////////////////////
    /// DEX LOGIC
    ////////////////////////////////////////////////////////////////

    /**
     * @notice User makes sales order
     * @dev 1. Only a user who owns the contract can put it up for sale
     * @dev 2. only if you have a purchase order equal to the sales order will you have a (match)
     * @dev 3. If the match happens, the contract will be sent to the buyer and ok tokens to the seller
     * @param investor The address of the user who owns the contract
     * @param rawCommodityAmount The amount of commodity the user wants to sell
     * @param amount The value that the user wants in his sales order
     */
    function sellOrder(address investor, uint256 rawCommodityAmount, uint256 amount) external {
        onlyFutures(investor, msg.sender);
        DexStorageLib.Storage storage lib = DexStorageLib.getDEXStorage();

        uint256 commodityAmount = unwrap(floor(ud60x18(rawCommodityAmount)));

        (bool _match, uint256 index) = findOrder(commodityAmount, amount, DexStorageLib.OrderType.Buy);

        DexStorageLib.Order memory sell;
        sell.commodityAmount = commodityAmount;
        sell.tokenAddress = address(0x0);
        sell.future = msg.sender;
        sell.investor = investor;
        sell.amount = amount;
        sell.typed = DexStorageLib.OrderType.Sell;

        if (_match) {
            swap(lib.orderBook[index], sell);
        } else {
            lib.orderBook.push(sell);
        }
    }

    /**
     * @notice Allows a user to create a buy order for a future contract.
     * @dev 1. This function can only be called by a user who wants to create a buy order for a future contract.
     * @dev 2. The payment token must be a stablecoin, and this check is enforced by the `onlyStableCoins` modifier.
     * @dev 3. If a matching sell order is found, the function executes the trade by calling the `swap` function.
     * @dev 4. If no matching sell order is found, the function adds the buy order to the order book.
     * @param tokenAddress The address of the payment token to be used for the purchase.
     * @param commodityAmount The amount of commodity the user wants to purchase.
     * @param amount The amount of payment tokens the user is willing to pay for the commodity.
     */
    function buyOrder(address tokenAddress, uint256 commodityAmount, uint256 amount) external {
        onlyStableCoins(tokenAddress);
        DexStorageLib.Storage storage lib = DexStorageLib.getDEXStorage();

        (bool _match, uint256 index) = findOrder(commodityAmount, amount, DexStorageLib.OrderType.Sell);

        DexStorageLib.Order memory buy;
        buy.commodityAmount = commodityAmount;
        buy.tokenAddress = tokenAddress;
        buy.future = address(0x0);
        buy.investor = msg.sender;
        buy.amount = amount;
        buy.typed = DexStorageLib.OrderType.Buy;

        if (_match) {
            swap(buy, lib.orderBook[index]);
        } else {
            lib.orderBook.push(buy);
        }
    }

    /**
     * @notice Allows a user to cancel an existing order.
     * @dev 1. This function can only be called by the owner of the order, checked by the `onlyOrderOwner` function.
     * @dev 2. The function attempts to find the order in the order book.
     * @dev 3. If the order is not found, the function reverts.
     * @dev 4. If the order is found, the function removes the order from the order book.
     * @param order The order to be cancelled.
     */
    function cancelOrder(DexStorageLib.Order calldata order) external {
        onlyOrderOwner(order.investor);
        DexStorageLib.Storage storage lib = DexStorageLib.getDEXStorage();

        (bool match_, uint256 index) = findOrder(order);

        if (match_ != true) {
            revertOrderNotFound();
        } else {
            // remover order from order book
            lib.orderBook[index] = lib.orderBook[lib.orderBook.length - 1];
            lib.orderBook.pop();
        }
    }

    /**
     * @notice Removes an order from the order book.
     * @dev 1. This function is only accessible within the contract.
     * @dev 2. The function iterates over the order book to find the order that matches the given parameters.
     * @dev 3. If the order is found, it is removed from the order book.
     * @param order The order to be removed from the order book.
     * @return A boolean indicating whether the order was successfully removed.
     */
    function removeOrder(DexStorageLib.Order memory order) private returns (bool) {
        DexStorageLib.Storage storage lib = DexStorageLib.getDEXStorage();

        for (uint256 index = 0; index < lib.orderBook.length; index++) {
            //
            if (lib.orderBook[index].typed != order.typed) {
                continue;
            } else {
                DexStorageLib.Order storage _order = lib.orderBook[index];
                //
                bool result = true;
                result = result && _order.commodityAmount == order.commodityAmount;
                result = result && _order.tokenAddress == order.tokenAddress;
                result = result && _order.investor == order.investor;
                result = result && _order.amount == order.amount;
                result = result && _order.future == order.future;
                //
                if (result) {
                    lib.orderBook[index] = lib.orderBook[lib.orderBook.length - 1];
                    lib.orderBook.pop();
                    return true;
                } else {
                    continue;
                }
            }
        }
        //
        return false;
    }

    /**
     * @notice Swaps two orders in the order book.
     * @dev 1. This function is only accessible within the contract.
     * @dev 2. The function attempts to remove both the buy and sell orders from the order book.
     * @dev 3. If either order is not found, the function reverts.
     * @dev 4. The function changes the owner of the contract in memory.
     * @dev 5. The function removes the contract from the list of the old investor and pushes it to the list of the new investor.
     * @dev 6. The function transfers the token from the buyer to the seller.
     * @dev 7. The function swaps the future between the two investors.
     * @param buy The buy order.
     * @param sell The sell order.
     */
    function swap(DexStorageLib.Order memory buy, DexStorageLib.Order memory sell) internal {
        CommodityStorageLib.Storage storage lib = CommodityStorageLib.getCommodityStorage();
        // remove buy/sell orders from orderbook
        bool buyrm = removeOrder(buy);
        bool sellrm = removeOrder(sell);

        if (buyrm && sellrm) {
            revertInternalError();
        }

        // change owner of contract in memory
        CommodityStorageLib.Contract[] storage futures = lib.contractsByInvestor[sell.investor];
        lib.contracts[sell.future].investor = buy.investor;

        // remove contract from list of old investor
        // push to list of new investor
        for (uint256 i = 0; i < futures.length; i++) {
            if (futures[i].investor == sell.investor) {
                // push to list of new investor
                lib.contractsByInvestor[buy.investor].push(futures[i]);
                // remove contract from list of old investor
                futures[i] = futures[futures.length - 1];
                futures.pop();
                break;
            }
        }

        // send Token
        ERC20 token = ERC20(buy.tokenAddress);
        bool sent = token.transferFrom(buy.investor, sell.investor, sell.amount);
        require(sent, "PAYMENT_FAILED");

        // swap on Future
        Future future = Future(sell.future);
        future.swap(buy.investor);
    }
}
