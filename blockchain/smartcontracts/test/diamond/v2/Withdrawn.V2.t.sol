// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {Commodity} from "../../../src/extracto/facet/commodity/Commodity.sol";
import {Future} from "../../../src/extracto/facet/future/Future.sol";
import {DiamondBaseSetupV2} from "./DiamondBaseSetup.V2.t.sol";

/*//////////////////////////////////////////////////////////////
            Validate the `creation` of Future
//////////////////////////////////////////////////////////////*/

contract WithdrawnV2 is DiamondBaseSetupV2 {
    function setUp() public virtual override {
        DiamondBaseSetupV2.setUp();
    }

    /*
    # Scenary: Buy 1 Contracts
        - Given: the contract purchase
        - When: should generate 1 contracts
        - Then: Show all contracts in address drawer
    */
    function test_withdrawn_1_contract(uint256 amount, address newInvestor) public {
        vm.assume(10e18 < amount && amount < 500 * 1e18);
        vm.assume(newInvestor != address(0x0) && newInvestor != investor);

        vm.prank(controller);
        usdc.transfer(newInvestor, amount);
        uint256 balanceBefore = usdc.balanceOf(newInvestor);

        vm.startPrank(newInvestor);
        usdc.approve(address(diamond), amount);

        (, bytes memory data) =
            address(diamond).call(abi.encodeWithSelector(commodityFacet.createFuture.selector, address(usdc), amount));
        (address _future, uint256 kg) = abi.decode(data, (address, uint256));
        vm.stopPrank();
        assertEq(balanceBefore - amount, usdc.balanceOf(newInvestor));

        (, bytes memory data2) =
            address(diamond).call(abi.encodeWithSelector(bytes4(keccak256(bytes("getFullDrawer()")))));
        address[] memory futures = abi.decode(data2, (address[]));
        assertEq(futures.length, 1);

        future = Future(_future);
        assertEq(future.getKg(), kg);
        assertEq(future.investor(), newInvestor);
        assertEq(future.dao(), address(diamond));
    }
}
