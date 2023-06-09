// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {
    InvalidToken,
    WithoutWhitelist,
    Unauthorized,
    ZeroAddress,
    UnavailableKilos
} from "../../../src/extracto/facet/commodity/Commodity.Auth.sol";
import {Future} from "../../../src/extracto/facet/future/Future.sol";
import {BaseSetup} from "../../BaseSetup.t.sol";
import {MockToken} from "../../MockToken.t.sol";

contract TestingZeroAdress is BaseSetup {
    function setUp() public virtual override {
        BaseSetup.setUp();
    }

    /*
    # Scenary: If owner zero address
        - Give: The owner is address zero
        - When: Search the contracts
        - Then: Should return a ZeroAddress error
    */
    function test_if_owner_zero_address_withdraw() public {
        uint256 amount = 485_00 * 1e16; // 485.00 USDC
        address zeroAddress = address(0x0);
        vm.startPrank(investor);
        usdc.approve(address(commodity), amount);
        commodity.createFuture(address(usdc), amount);

        future = Future(commodity.drawer(0));
        assertEq(future.investor(), investor);
        vm.stopPrank();

        vm.startPrank(zeroAddress);
        vm.expectRevert(abi.encodeWithSelector(ZeroAddress.selector, zeroAddress));
        future.withdraw();
        vm.stopPrank();
    }

    /*
    # Scenary: a zero address tries to buy a contract but returns Zero Address
        - Give: ZeroAddress tries to buy
        - When: Contract verifies his address
        - Then: Should receive a ZeroAddress error
    */
    function test_buy_zero_address() public {
        uint256 amount = 485_00 * 1e16; // 485.00 USDC
        address zeroaddress = address(0x0);
        vm.startPrank(zeroaddress);
        usdc.approve(address(commodity), amount);
        vm.expectRevert(abi.encodeWithSelector(ZeroAddress.selector, zeroaddress));
        commodity.createFuture(address(usdc), amount);
        vm.stopPrank();
    }
}
