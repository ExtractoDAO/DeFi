// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {Commodity} from "../../../src/extracto/commodity/Commodity.sol";
import {Future} from "../../../src/extracto/future/Future.sol";
import {BaseSetup} from "../../BaseSetup.sol";

/*//////////////////////////////////////////////////////////////
            Validate the `creation` of Future
//////////////////////////////////////////////////////////////*/

contract BuyContractsDrawer is BaseSetup {
    function setUp() public virtual override {
        BaseSetup.setUp();
    }

    /*
    # Scenary: Buy 100 Contracts
        - Given: the contract purchase
        - When: should generate 100 contracts
        - Then: Show all contracts in address drawer
    */
    function test_buy_100_contracts(uint256 amount, address newInvestor) public {
        uint256 total_test = 100;
        vm.assume(10e18 < amount && amount < 500 * 1e18);
        vm.assume(newInvestor != address(0x0) && newInvestor != investor);

        for (uint256 i = 0; i < total_test; i++) {
            vm.prank(controller);
            usdc.transfer(newInvestor, amount);
            uint256 balanceBefore = usdc.balanceOf(newInvestor);

            vm.startPrank(newInvestor);
            usdc.approve(address(commodity), amount);
            commodity.createFuture(address(usdc), amount);
            vm.stopPrank();
            assertEq(balanceBefore - amount, usdc.balanceOf(newInvestor));
        }

        address[] memory futures = commodity.getFullDrawer();
        assertEq(futures.length, total_test);

        for (uint256 i = 0; i < total_test; i++) {
            (address _investor,, uint256 _kg,) = commodity.getContract(futures[i]);
            future = Future(futures[i]);
            assertEq(future.getKg(), _kg);
            assertEq(future.investor(), _investor);
            assertEq(future.dao(), address(commodity));
        }
    }

    // TODO: docs
    function test_buy_futures_insufficient_amount() public {
        uint256 amount = 0; // 197.123456 xUSD
        vm.startPrank(investor);
        xusd.approve(address(commodity), amount);

        vm.expectRevert("INSUFFICIENT_AMOUNT");
        (address _future,) = commodity.createFuture(address(xusd), amount);

        future = Future(_future);

        vm.stopPrank();
    }
}
