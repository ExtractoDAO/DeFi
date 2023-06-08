// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {BaseSetup} from "../../BaseSetup.t.sol";
import {Future} from "../../../src/extracto/facet/future/Future.sol";
import {Commodity} from "../../../src/extracto/facet/commodity/Commodity.sol";
import {EStorage} from "../../../src/extracto/facet/commodity/Commodity.Storage.sol";

contract SwapThenYielding is BaseSetup {
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
    function test_yielding_after_swap() public {
        address investor1 = address(0x1);
        address investor2 = address(0x2);

        uint256 commodityAmount = 189_21 * 10e17; // 189.21kg
        uint256 amount = 361_398 * 1e15; // $361.398 USDC

        vm.startPrank(controller);
        usdc.transfer(investor1, amount); // $361.398
        usdc.transfer(investor2, amount * 2); // $722.796USD
        vm.stopPrank();

        // Put Sell Order
        vm.startPrank(investor1);
        usdc.approve(address(commodity), amount);
        (address _future,) = commodity.createFuture(address(usdc), amount); // buy contract of 189.21kg by $361.398USD
        future = Future(_future);
        future.sell(amount * 2); // sell order of 189.21kg by $722.796USD
        vm.stopPrank();

        vm.prank(investor2);
        usdc.approve(address(commodity), amount * 2);
        vm.prank(investor2);
        commodity.buyOrder(address(usdc), commodityAmount, amount * 2); // buy order of 189.21kg by $722.796USD

        vm.prank(deployer);
        commodity.updateYieldFarming(17); // update yield farming to 17%

        vm.roll(_135days_in_blocks_to_unlock);
        vm.prank(investor2);
        future.withdraw();

        assertEq(cow.balanceOf(investor2), 4228_35_6329999999999999);
    }
}
