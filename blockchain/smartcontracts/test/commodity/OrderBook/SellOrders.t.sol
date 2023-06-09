// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {BaseSetup} from "../../BaseSetup.t.sol";
import {Future} from "../../../src/extracto/facet/future/Future.sol";
import {Commodity} from "../../../src/extracto/facet/commodity/Commodity.sol";

contract SellOrders is BaseSetup {
    function setUp() public virtual override {
        BaseSetup.setUp();
    }
    /*
    # Scenary: Put a single Sell Order
        - Give: that the a investor sell contracts
        - When: see the order book
        - Then: should have 1 ask order
    */

    function test_length_of_ask_order_book() public {
        uint256 amount = 11 * 10e18;

        vm.prank(controller);
        usdc.transfer(investor, amount);

        vm.startPrank(investor);
        usdc.approve(address(commodity), amount);
        (address _future, uint256 _commodityAmount) = commodity.createFuture(address(usdc), amount);
        future = Future(_future);
        future.sell(amount + 1 * 10e18);
        vm.stopPrank();

        Commodity.Order[] memory asks = commodity.sellOrders();
        assertEq(asks.length, 1);

        assertApproxEqRel(asks[0].commodityAmount, _commodityAmount, 10e14, "commodityAmount dont match");
        assertEq(asks[0].tokenAddress, address(0x0), "token addres dont match");
        assertEq(asks[0].amount, amount + 1 * 10e18, "amount dont match");
        assertEq(asks[0].investor, investor, "investor dont match");
        assertEq(asks[0].future, _future, "future dont match");
    }
}
