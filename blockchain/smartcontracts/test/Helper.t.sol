// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {console2} from "forge-std/console2.sol";
import {Test} from "forge-std/Test.sol";
import {Vm} from "forge-std/Vm.sol";
import {CommodityFacet} from "../src/extracto/facet/commodity/v2/Commodity.Facet.sol";
import {Diamond} from "../src/extracto/diamond/Diamond.sol";

contract Helper is Test {
    Diamond diamond;
    bytes4 fn;
    bytes payload;
    bool ok;
    bytes data;

    constructor(Diamond _diamond) {
        diamond = _diamond;
    }

    function createFuture(address owner, address token, uint256 amount) public returns (address _future, uint256 kg) {
        fn = bytes4(keccak256(bytes("createFuture(address,uint256)")));
        payload = abi.encodeWithSelector(fn, token, amount);

        vm.prank(owner);
        (ok, data) = address(diamond).call(payload);
        if (!ok) {
            revert(string(data));
        } else {
            (_future, kg) = abi.decode(data, (address, uint256));
        }
    }

    function fullDrawer() public returns (address[] memory futures) {
        fn = bytes4(keccak256(bytes("getFullDrawer()")));
        payload = abi.encodeWithSelector(fn);
        (ok, data) = address(diamond).call(payload);
        if (!ok) {
            revert(string(data));
        } else {
            futures = abi.decode(data, (address[]));
        }
    }

    function getTokens() public returns (address[] memory tokens) {
        fn = bytes4(keccak256(bytes("getAllowedTokens()")));
        payload = abi.encodeWithSelector(fn);
        (ok, data) = address(diamond).call(payload);
        if (!ok) {
            revert(string(data));
        } else {
            tokens = abi.decode(data, (address[]));
        }
    }

    function addTokens(address owner, address token, uint8 decimals) external returns (bool) {
        fn = bytes4(keccak256(bytes("addTokens(address,uint8)")));
        payload = abi.encodeWithSelector(fn, token, decimals);

        vm.prank(owner);
        (ok, data) = address(diamond).call(payload);
        if (!ok) {
            revert(string(data));
        } else {
            return ok;
        }
    }

    function delTokens(address owner, address token) external returns (bool) {
        fn = bytes4(keccak256(bytes("delTokens(address)")));
        payload = abi.encodeWithSelector(fn, token);

        vm.prank(owner);
        (ok, data) = address(diamond).call(payload);

        if (!ok) {
            revert(string(data));
        } else {
            return ok;
        }
    }
}
