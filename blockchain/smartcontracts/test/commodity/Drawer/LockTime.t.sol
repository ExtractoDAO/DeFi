// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {Commodity} from "../../../src/extracto/facet/commodity/Commodity.sol";
import {Future} from "../../../src/extracto/facet/future/Future.sol";
import {BaseSetup} from "../../BaseSetup.t.sol";

/*//////////////////////////////////////////////////////////////
        Validate the `locktime` applied by Dao on Future
//////////////////////////////////////////////////////////////*/

contract LockTime is BaseSetup {
    function setUp() public virtual override {
        BaseSetup.setUp();
    }

    /*
    # Scenary: Lock time dynamic
        - Given: must receive a timelock
        - When: When a commodity contract is generated
        - Then: Must have a timelock from the commodity contract itself
    */
    function test_locktime_dynamic(uint256 locktime) public {
        Commodity daoLocktime =
            new Commodity(tokens, decimals, locktime, kgSupply, kgPrice,kgPrice, true, controller, address(cow));
        vm.startPrank(investor);

        usdc.approve(address(daoLocktime), 10 * 1e18);
        daoLocktime.createFuture(address(usdc), 10 * 1e18);

        address _future = daoLocktime.drawer(0);
        future = Future(_future);

        assertEq(future.dao(), address(daoLocktime));
        assertEq(future.getLockTime(), locktime);
        assertEq(future.investor(), investor);
        vm.stopPrank();
    }

    /*
    # Scenary: Lock time update dynamic
        - Given: Must receive a timelock
        - When: You have to update the commodity time lock
        - Then: And receive the new timelock
    */
    function test_locktime_update_dynamic(uint256 locktime) public {
        vm.prank(controller);
        commodity =
        new Commodity(tokens, decimals, _135days_in_blocks_to_unlock, kgSupply, kgPrice, kgPrice, true, controller, address(cow));

        assertEq(commodity.getLockTime(), _135days_in_blocks_to_unlock);

        {
            vm.startPrank(investor);

            usdc.approve(address(commodity), 10 * 1e18);
            commodity.createFuture(address(usdc), 10 * 1e18);

            address _future = commodity.drawer(0);
            Future future1 = Future(_future);

            assertEq(future1.getLockTime(), _135days_in_blocks_to_unlock);

            vm.stopPrank();
        }

        vm.prank(controller);
        commodity.updateLockTime(locktime);

        assertEq(commodity.getLockTime(), locktime);

        {
            vm.startPrank(investor);

            usdc.approve(address(commodity), 10 * 1e18);
            commodity.createFuture(address(usdc), 10 * 1e18);

            address _future = commodity.drawer(1);
            Future future2 = Future(_future);

            assertEq(future2.getLockTime(), locktime);

            vm.stopPrank();
        }
    }
}
