// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {Commodity} from "../../../src/extracto/facet/commodity/Commodity.sol";
import {Future} from "../../../src/extracto/facet/future/Future.sol";
import {BaseSetup} from "../../BaseSetup.t.sol";
import {MockToken} from "../../MockToken.t.sol";

/*//////////////////////////////////////////////////////////////
            Testing `pucharses` with different tokens
//////////////////////////////////////////////////////////////*/

contract StableCoinsFuture is BaseSetup {
    function setUp() public virtual override {
        BaseSetup.setUp();
    }

    /*
    # Scenary: Buy futures with USDC
     - Given: the investor want buy 498.00 `USDC` of Kg meat
     - When: the investor give approve for Dao
     - AND: buy Future contract
     - Then: the Dao receive 498.00 USDC
     - AND: a new Future contract is created
     - AND: this contract have Kg that should be 260.73 kg
     - AND: this contract should be locked at block number 6,415,200
     - AND: this contract have an owner that should be investor address
     - AND: this contract should have sale deactivated
     - AND: this contract have emissor that should be Dao address
     - AND: this contract have price that should be 0
    */
    function test_buy_Futures_with_USDC() public {
        uint256 amount = 498 * 1e18; // 498.00 USDC
        vm.startPrank(investor);

        uint256 balanceBeforeInvestor = usdc.balanceOf(investor);
        uint256 balanceBeforeDao = usdc.balanceOf(controller);

        usdc.approve(address(commodity), amount);
        (address _future,) = commodity.createFuture(address(usdc), amount);

        assertEq(balanceBeforeInvestor - amount, usdc.balanceOf(investor));
        assertEq(balanceBeforeDao + amount, usdc.balanceOf(controller));

        future = Future(_future);

        assertEq(
            future.getKg(),
            // 260.73 kg
            260_73_298429319371727700
        );

        assertEq(future.getLockTime(), _135days_in_blocks_to_unlock);
        assertEq(future.investor(), investor);

        assertEq(future.dao(), address(commodity));

        vm.stopPrank();
    }

    /*
    # Scenary: Buy futures with USDT
     - Given: the investor want buy 178.78 `USDT` of Kg meat
     - When: the investor give approve for Dao
     - AND: buy Future contract
     - Then: the Dao receive 498.00 USDC
     - AND: a new Future contract is created
     - AND: this contract have Kg that should be 93.60 kg
     - AND: this contract should be locked at block number 6,415,200
     - AND: this contract have an owner that should be investor address
     - AND: this contract should have sale deactivated
     - AND: this contract have emissor that should be Dao address
     - AND: this contract have price that should be 0
    */
    function test_buy_Futures_with_USDT() public {
        uint256 amount = 178_78 * 1e16; // 178.78 USDC
        vm.startPrank(investor);

        uint256 balanceBeforeInvestor = usdt.balanceOf(investor);
        uint256 balanceBeforeDao = usdt.balanceOf(controller);
        usdt.approve(address(commodity), amount);

        (address _future,) = commodity.createFuture(address(usdt), amount);

        assertEq(balanceBeforeInvestor - amount, usdt.balanceOf(investor));
        assertEq(balanceBeforeDao + amount, usdt.balanceOf(controller));

        future = Future(_future);

        assertEq(
            future.getKg(),
            // 93.60 kg
            93_60_209424083769633500
        );

        assertEq(future.getLockTime(), _135days_in_blocks_to_unlock);
        assertEq(future.investor(), investor);

        assertEq(future.dao(), address(commodity));

        vm.stopPrank();
    }

    /*
    # Scenary: Buy futures with BUSD
     - Given: the investor want buy 377.118288 `BUSD` of Kg
     - When: the investor give approve for Dao
     - AND: buy Future contract
     - Then: the Dao receive 377.118288 BUSD
     - AND: a new Future contract is created
     - AND: this contract have Kg that should be 197.44 kg
     - AND: this contract should be locked at block number 6,415,200
     - AND: this contract have an owner that should be investor address
     - AND: this contract should have sale deactivated
     - AND: this contract have emissor that should be Dao address
     - AND: this contract have price that should be 0
    */
    function test_buy_Futures_with_BUSD() public {
        uint256 amount = 377_118288 * 1e12; // 377.118288 BUSD
        vm.startPrank(investor);

        uint256 balanceBeforeInvestor = busd.balanceOf(investor);
        uint256 balanceBeforeDao = busd.balanceOf(controller);
        busd.approve(address(commodity), amount);

        (address _future,) = commodity.createFuture(address(busd), amount);

        assertEq(balanceBeforeInvestor - amount, busd.balanceOf(investor));
        assertEq(balanceBeforeDao + amount, busd.balanceOf(controller));

        future = Future(_future);

        assertEq(
            future.getKg(),
            // 197.44 kg
            197_44_412984293193717200
        );

        assertEq(future.getLockTime(), _135days_in_blocks_to_unlock);
        assertEq(future.investor(), investor);

        assertEq(future.dao(), address(commodity));

        vm.stopPrank();
    }

    /*
    # Scenary: Buy futures with DAI
     - Given: the investor want buy 197.123456789012345678 `DAI` of Kg meat
     - When: the investor give approve for Dao
     - AND: buy Future contract
     - Then: the Dao receive 197.123456789012345678 DAI
     - AND: a new Future contract is created
     - AND: this contract have Kg that should be 103.20599831885464 kg
     - AND: this contract should be locked at block number 6,415,200
     - AND: this contract have an owner that should be investor address
     - AND: this contract should have sale deactivated
     - AND: this contract have emissor that should be Dao address
     - AND: this contract have price that should be 0
    */
    function test_buy_Futures_with_DAI() public {
        uint256 amount = 197_123456789012345678; // 197.123456789012345678 DAI
        vm.startPrank(investor);

        uint256 balanceBeforeInvestor = dai.balanceOf(investor);
        uint256 balanceBeforeDao = dai.balanceOf(controller);
        dai.approve(address(commodity), amount);

        (address _future,) = commodity.createFuture(address(dai), amount);

        assertEq(balanceBeforeInvestor - amount, dai.balanceOf(investor));
        assertEq(balanceBeforeDao + amount, dai.balanceOf(controller));

        future = Future(_future);

        assertEq(
            future.getKg(),
            // 103.20599831885464 kg
            103_20_599831885463124500
        );

        assertEq(future.getLockTime(), _135days_in_blocks_to_unlock);
        assertEq(future.investor(), investor);

        assertEq(future.dao(), address(commodity));

        vm.stopPrank();
    }

    /*
    # Scenary: Buy futures with XUSD
     - Given: the investor want buy 197.123456789012345678 `xUSD` of Kg meat
     - When: the investor give approve for Dao
     - AND: buy Future contract
     - Then: the Dao receive 197.123456789012345678 xUSD
     - AND: a new Future contract is created
     - AND: this contract have Kg that should be 103.20599831885464 kg
     - AND: this contract should be locked at block number 6,415,200
     - AND: this contract have an owner that should be investor address
     - AND: this contract should have sale deactivated
     - AND: this contract have emissor that should be Dao address
     - AND: this contract have price that should be 0
    */
    function test_buy_Futures_with_xUSD() public {
        uint256 amount = 197_123456; // 197.123456 xUSD
        vm.startPrank(investor);

        uint256 balanceBeforeInvestor = dai.balanceOf(investor);
        uint256 balanceBeforeDao = dai.balanceOf(controller);
        xusd.approve(address(commodity), amount);

        (address _future,) = commodity.createFuture(address(xusd), amount);

        assertEq(balanceBeforeInvestor - amount, xusd.balanceOf(investor));
        assertEq(balanceBeforeDao + amount, xusd.balanceOf(controller));

        future = Future(_future);

        assertEq(
            future.getKg(),
            // 103.20599831885464 kg
            103_20_599700000000000000
        );

        assertEq(future.getLockTime(), _135days_in_blocks_to_unlock);
        assertEq(future.investor(), investor);

        assertEq(future.dao(), address(commodity));

        vm.stopPrank();
    }
}
