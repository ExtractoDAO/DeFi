// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {
    InvalidToken,
    WithoutWhitelist,
    Unauthorized,
    ZeroAddress,
    UnavailableKilos
} from "../../../src/extracto/commodity/Commodity.Auth.sol";
import {Future} from "../../../src/extracto/future/Future.sol";
import {BaseSetup} from "../../BaseSetup.t.sol";
import {MockToken} from "../../MockToken.t.sol";

contract OnlyMembersOfWhitelistCanBuy is BaseSetup {
    function setUp() public virtual override {
        BaseSetup.setUp();
    }

    /*
    # Scenary: Investor is not VIP
        - Give: that the investor is not on the whiteliste
        - When: he tries to buy
        - Then: should revert to "SALE_DEACTIVATED"
    */
    function test_investor_is_not_vip(address newInvestor) public {
        vm.assume(newInvestor != address(0x0));
        uint256 amount = 498 * 1e18; // 498.00 USDC
        vm.prank(controller);
        usdc.transfer(newInvestor, amount);

        vm.startPrank(deployer);
        commodity.updateActive(false);
        vm.stopPrank();

        vm.startPrank(newInvestor);

        usdc.approve(address(commodity), amount);
        vm.expectRevert(abi.encodeWithSelector(WithoutWhitelist.selector, newInvestor));
        commodity.createFuture(address(usdc), amount);

        vm.stopPrank();
    }

    /*
    # Scenary: Inverstor is VIP
        - Given: that an investor has been added to the Whitelist
        - When: he tries to buy
        - Then: he gets to buy
    */
    function test_investor_is_vip(address newInvestor) public {
        vm.assume(newInvestor != address(0x0));
        uint256 amount = 498 * 1e18; // 498.00 USDC
        vm.prank(controller);
        usdc.transfer(newInvestor, amount);

        vm.startPrank(deployer);
        commodity.updateActive(false);

        address[] memory whitelist = commodity.getWhiteList();
        for (uint256 i = 0; i < whitelist.length; i++) {
            require(whitelist[i] != newInvestor);
        }
        commodity.addAddressWhitelist(newInvestor);

        vm.stopPrank();
        vm.startPrank(newInvestor);

        usdc.approve(address(commodity), amount);
        (address _future,) = commodity.createFuture(address(usdc), amount);
        future = Future(_future);

        assertEq(future.getLockTime(), _135days_in_blocks_to_unlock);
        assertEq(future.investor(), newInvestor);
        assertEq(future.dao(), address(commodity));
        assertEq(
            future.getKg(),
            // 260.73 kg
            260_73_298429319371727700
        );

        vm.stopPrank();
    }

    /*
    # Scenary: Investor removed from vip
        - Given: that an investor has been added to the Whitelist
        - And: after he has been removed from the Whitelist
        - When: he tries to buy
        - Then: should revert to "SALE_DEACTIVATED"
    */
    function test_investor_is_removed_from_vip(address newInvestor) public {
        vm.assume(newInvestor != address(0x0));
        uint256 amount = 498 * 1e18; // 498.00 USDC
        vm.prank(controller);
        usdc.transfer(newInvestor, amount);

        vm.startPrank(deployer);
        commodity.updateActive(false);

        address[] memory whitelist = commodity.getWhiteList();
        for (uint256 i = 0; i < whitelist.length; i++) {
            require(whitelist[i] != newInvestor);
        }
        commodity.addAddressWhitelist(newInvestor);
        vm.roll(100);
        commodity.delAddressWhitelist(newInvestor);

        vm.stopPrank();
        vm.startPrank(newInvestor);

        usdc.approve(address(commodity), amount);
        vm.expectRevert(abi.encodeWithSelector(WithoutWhitelist.selector, newInvestor));
        commodity.createFuture(address(usdc), amount);

        vm.stopPrank();
    }
}
