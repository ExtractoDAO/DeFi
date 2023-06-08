// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {BaseSetup} from "../../BaseSetup.t.sol";
import {Future} from "../../../src/extracto/facet/future/Future.sol";
import {Commodity} from "../../../src/extracto/facet/commodity/Commodity.sol";
import {EStorage} from "../../../src/extracto/facet/commodity/Commodity.Storage.sol";

contract SwapThenSettle is BaseSetup {
    function setUp() public virtual override {
        BaseSetup.setUp();
    }

    /*
    Scenary: Perform swap
    - Given: investor1 buy a contract for 250.00 `USDC`.
    - And: this contract should have 130.89kg
    - And: investor1 put sell order of this contract for 500.00 `USDC`.
    - AND: investor2 put buy order of 130.89kg by 500.00 USDC
    - Then: The contract must change ownership from investor1 to investor2
    - And: investor1 should receive 500.0 USDC
    */
    function test_withdraw_after_swap() public {
        address investor1 = address(0x1);
        address investor2 = address(0x2);

        uint256 commodityAmount = 130_89 * 10e18; // 130.89kg
        uint256 amount = 250 * 10e18;

        vm.startPrank(controller);
        // $250USD
        usdc.transfer(investor1, amount);
        // $500USD
        usdc.transfer(investor2, amount * 2);
        vm.stopPrank();

        // Put Sell Order
        vm.startPrank(investor1);
        usdc.approve(address(commodity), amount);
        // buy contract by $250USD
        (address _future,) = commodity.createFuture(address(usdc), amount);
        future = Future(_future);
        // sell order of $500USD
        future.sell(amount * 2);
        vm.stopPrank();

        vm.prank(investor2);
        usdc.approve(address(commodity), amount * 2);
        vm.prank(investor2);
        // buy order of $500USD
        commodity.buyOrder(address(usdc), commodityAmount, amount * 2);

        vm.roll(_135days_in_blocks_to_unlock);
        vm.prank(investor2);
        future.withdraw();
    }
}
