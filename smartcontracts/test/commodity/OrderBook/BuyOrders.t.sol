// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {BaseSetup} from "../../BaseSetup.t.sol";
import {Future} from "../../../src/extracto/future/Future.sol";
import {Commodity} from "../../../src/extracto/commodity/Commodity.sol";
import "../../../src/extracto/commodity/Commodity.Storage.sol";

contract BuyOrders is BaseSetup {
    function setUp() public virtual override {
        BaseSetup.setUp();
    }

    /*
    # Scenary: Put a single Buy Order
        - Give: that the a investor buy contract
        - When: see the order book
        - Then: should have 1 bid order
    */
    function test_length_of_bid_book() public {
        vm.assume(investor != address(0x0));
        uint256 amount = 11 * 10e18;
        uint256 _commodityAmount = 5759 * 10e16; // 57.59kg
        vm.label(investor, string(abi.encodePacked("new investor")));

        vm.prank(controller);
        usdc.transfer(investor, amount);

        vm.startPrank(investor);
        commodity.buyOrder(address(usdc), _commodityAmount, amount);
        vm.stopPrank();

        Commodity.Order[] memory bids = commodity.buyOrders();
        assertEq(bids.length, 1);

        assertApproxEqRel(bids[0].commodityAmount, _commodityAmount, 10e14, "commodityAmount dont match");
        assertEq(bids[0].tokenAddress, address(usdc), "token addres dont match");
        assertEq(bids[0].investor, investor, "investor dont match");
        assertEq(bids[0].future, address(0x0), "future dont match");
        assertEq(bids[0].amount, amount, "amount dont match");
    }
}
