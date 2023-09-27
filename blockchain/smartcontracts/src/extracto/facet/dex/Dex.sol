// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {CommodityStorageLib} from "../../diamond/libraries/Lib.Commodity.sol";
import {DexStorageLib} from "../../diamond/libraries/Lib.Dex.sol";
import {ERC20} from "../../../token/ERC20.sol";
import {Future} from "../future/Future.sol";
import "../../../utils/math/UD60x18.sol";
import {Crud} from "./Dex.Crud.sol";

contract Dex is Crud {
    constructor() Crud() {}

    function sellOrder(address investor, uint256 amount) external returns (bytes32 id) {
        zeroAddr(investor);
        zeroAddr(msg.sender);
        onlyFutures(msg.sender);
        onlyNonListed(msg.sender);
        onlyNotBurnedFutures(msg.sender);
        onlyOwnerOfFutures(investor, msg.sender);

        DexStorageLib.Storage storage lib = DexStorageLib.getDexStorage();
        CommodityStorageLib.Storage storage libCommodity = CommodityStorageLib.getCommodityStorage();

        uint256 rawCommodityAmount = libCommodity.contracts[msg.sender].commodityAmount;
        uint256 commodityAmount = unwrap(floor(ud60x18(rawCommodityAmount)));
        uint256 randNonce = rawCommodityAmount - commodityAmount;

        DexStorageLib.Order memory sell = mountOrder(
            commodityAmount, amount, address(0x0), msg.sender, investor, DexStorageLib.OrderType.Sell, randNonce
        );
        DexStorageLib.Order[] memory order = lib.orderBookMatch[sell.amount][sell.commodityAmount];

        if (order.typed == DexStorageLib.OrderType.Buy && order.investor != address(0x0)) {
            swap(order, sell);
        } else {
            lib.orderBookMatch[sell.amount][sell.commodityAmount] = sell;
            lib.ordersByInvestor[sell.investor].push(sell);
            lib.orderById[sell.id] = sell;
            lib.orderBook.push(sell);
            id = sell.id;

            emit SellOrder(id, sell.future, sell.amount, sell.commodityAmount);
        }
    }

    function buyOrder(address tokenAddress, uint256 commodityAmount, uint256 amount, uint256 randNonce)
        external
        returns (bytes32 id)
    {
        onlyStableCoins(tokenAddress);
        validateAllowance(tokenAddress, msg.sender, address(this), amount);

        DexStorageLib.Order memory buy = mountOrder(
            commodityAmount, amount, tokenAddress, address(0x0), msg.sender, DexStorageLib.OrderType.Buy, randNonce
        );

        DexStorageLib.Storage storage lib = DexStorageLib.getDexStorage();
        DexStorageLib.Order[] memory order = lib.orderBookMatch[buy.amount][buy.commodityAmount];

        if (order.typed == DexStorageLib.OrderType.Sell && order.investor != address(0x0)) {
            swap(buy, order);
        } else {
            lib.orderBookMatch[buy.amount][buy.commodityAmount] = buy;
            lib.ordersByInvestor[buy.investor].push(buy);
            lib.orderById[buy.id] = buy;
            lib.orderBook.push(buy);
            id = buy.id;

            emit BuyOrder(id, buy.amount, buy.commodityAmount);
        }
    }

    function cancelOrder(bytes32 orderId) external {
        zeroAddr(msg.sender);
        onlyTrueOrder(orderId);
        onlyOwnerOfOrder(msg.sender, orderId);

        DexStorageLib.Storage storage lib = DexStorageLib.getDexStorage();
        DexStorageLib.Order memory order = lib.orderById[orderId];

        removeOrder(msg.sender, orderId);

        emit CancelOrder(order.id, order.amount, order.commodityAmount, order.typed);
    }

    function removeOrder(address investor, bytes32 orderId) internal {
        DexStorageLib.Storage storage lib = DexStorageLib.getDexStorage();
        DexStorageLib.Order[] storage order = lib.orderById[orderId];

        delete lib.orderBookMatch[order.amount][order.commodityAmount];
        delete lib.orderById[orderId];

        DexStorageLib.Order[] storage orders = lib.ordersByInvestor[investor];
        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].id == orderId) {
                orders[i] = orders[orders.length - 1];
                orders.pop();
                break;
            }
        }

        for (uint256 i = 0; i < lib.orderBook.length; i++) {
            if (lib.orderBook[i].id == orderId) {
                lib.orderBook[i] = lib.orderBook[lib.orderBook.length - 1];
                lib.orderBook.pop();
                break;
            }
        }
    }

    function swap(DexStorageLib.Order memory buy, DexStorageLib.Order memory sell) internal {
        CommodityStorageLib.Storage storage libCommodity = CommodityStorageLib.getCommodityStorage();

        onlyOtherInvestor(buy.investor, sell.investor);
        onlyNotBurnedFutures(sell.investor);

        removeOrder(buy.investor, buy.id);
        removeOrder(sell.investor, sell.id);

        libCommodity.contracts[sell.investor].investor = buy.investor;
        CommodityStorageLib.Contract[] storage contracts = libCommodity.contractsByInvestor[sell.investor];
        for (uint256 i = 0; i < contracts.length; i++) {
            if (contracts[i].future == sell.future) {
                libCommodity.contractsByInvestor[buy.investor].push(contracts[i]);
                contracts[i] = contracts[contracts.length - 1];
                contracts.pop();
                break;
            }
        }

        validatePayment(buy.tokenAddress, buy.investor, sell.investor, sell.amount);

        Future future = Future(sell.future);
        future.swap(buy.investor);

        emit MatchOrder(sell.investor, buy.investor, sell.future, sell.amount, sell.commodityAmount);
    }
}
