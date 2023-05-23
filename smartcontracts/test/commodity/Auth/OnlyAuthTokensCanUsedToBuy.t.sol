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
import {BaseSetup} from "../../BaseSetup.sol";
import {MockToken} from "../../MockToken.sol";

contract OnlyAuthTokensCanUsedToBuy is BaseSetup {
    function setUp() public virtual override {
        BaseSetup.setUp();
    }

    /*
    # Scenary: Token is not VIP
        - Given: that an TOKEN has been removed from TokenWhitelist
        - When: the INVESTOR tries to buy
        - Then: it should revert to "UNAUTHORIZED_TOKEN
    */
    function test_token_is_not_vip() public {
        uint256 amount = 498 * 1e18; // 498.00 NOAUTH
        MockToken noauth = new MockToken("NOAUTH", amount * 2, 18);

        noauth.approve(address(commodity), amount);

        noauth.approve(address(commodity), amount);

        vm.expectRevert(abi.encodeWithSelector(InvalidToken.selector, address(noauth)));
        commodity.createFuture(address(noauth), amount);
    }

    /*
    # Scenary: TOKEN removed from vip
        - Given: that a TOKEN has been added to the TokenWhitelist
        - And: after he has been removed from the TokenWhitelist
        - When: the INVESTOR tries to buy
        - Then: it should revert to "UNAUTHORIZED_TOKEN
    */
    function test_token_is_removed_from_vip() public {
        uint256 amount = 498 * 1e18; // 498.00 NOAUTH

        vm.prank(investor);
        MockToken noauth = new MockToken("NOAUTH", amount * 2, 18);

        address[] memory _tokens = commodity.getTokens();
        for (uint256 i = 0; i < _tokens.length; i++) {
            require(_tokens[i] != address(noauth));
        }

        vm.startPrank(deployer);
        commodity.addTokens(address(noauth), 18);
        vm.roll(100);
        commodity.delTokens(address(noauth));

        vm.stopPrank();
        vm.startPrank(investor);

        noauth.approve(address(commodity), amount);
        vm.expectRevert(abi.encodeWithSelector(InvalidToken.selector, address(noauth)));
        commodity.createFuture(address(noauth), amount);

        vm.stopPrank();
    }
}
