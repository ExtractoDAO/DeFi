// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {BaseSetup} from "../../BaseSetup.sol";
import {Future} from "../../../src/extracto/future/Future.sol";
import {Commodity} from "../../../src/extracto/commodity/Commodity.sol";
import {EStorage} from "../../../src/extracto/commodity/Commodity.Storage.sol";

contract CancelOrders is BaseSetup {
    uint256 MAX_PRVK = 115792089237316195423570985008687907852837564279074904382605163141518161494337;

    function setUp() public virtual override {
        BaseSetup.setUp();
    }

    /*
    # Scenary: Remove Sell Order
        - Give: that a investor sell contracts
        - And: this investors cancel your order
        - When: see the order book
        - Then: should have 0 ask orders
    */
    function test_canceled_sell_order_book_length(uint256 private_key) public {
        vm.assume(0 < private_key && private_key < MAX_PRVK);
        investor = vm.addr(private_key);
        uint256 sellAmount = 12 * 10e18;
        uint256 sellCommodityAmount = 628_20 * 10e16; // 628.20kg

        vm.prank(controller);
        usdc.transfer(investor, sellAmount);

        // Put Sell Order
        vm.startPrank(investor);
        usdc.approve(address(commodity), sellAmount);
        (address _future,) = commodity.createFuture(address(usdc), sellAmount);
        future = Future(_future);
        future.sell(sellAmount);
        vm.stopPrank();

        // 1 Validation
        assertEq(commodity.sellOrders().length, 1);

        // Cancel Sell Order
        Commodity.Order memory sell;
        sell.commodityAmount = sellCommodityAmount;
        sell.amount = sellAmount;
        sell.tokenAddress = address(0x0);
        sell.future = _future;
        sell.investor = investor;
        sell.typed = EStorage.OrderType.Sell;

        vm.prank(investor);
        commodity.cancelOrder(sell);

        // 2 Validation
        assertEq(commodity.sellOrders().length, 0);
    }
    /*
    # Scenary: Remove Buy Order
        - Give: that a investor put a buy order contract
        - And: this investors cancel your order
        - When: see the order book
        - Then: should have 0 ask orders
    */

    function test_canceled_buy_order_book_length(uint256 private_key) public {
        vm.assume(0 < private_key && private_key < MAX_PRVK);
        investor = vm.addr(private_key);
        uint256 buyCommodityAmount = 10_99 * 10e16; // 10.99kg
        uint256 buyAmount = 11 * 10e18;

        // Put Buy Order
        vm.prank(investor);
        commodity.buyOrder(address(usdc), buyCommodityAmount, buyAmount);

        // 1 Validation
        assertEq(commodity.buyOrders().length, 1);

        // Cancel Buy Order
        Commodity.Order memory buy;
        buy.commodityAmount = buyCommodityAmount;
        buy.amount = buyAmount;
        buy.tokenAddress = address(usdc);
        buy.future = address(0x0);
        buy.investor = investor;
        buy.typed = EStorage.OrderType.Buy;

        vm.prank(investor);
        commodity.cancelOrder(buy);

        // 2 Validation
        assertEq(commodity.buyOrders().length, 0);
    }
}
