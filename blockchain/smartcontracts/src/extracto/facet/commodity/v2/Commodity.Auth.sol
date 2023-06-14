// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {CommodityStorageLib} from "../../../diamond/libraries/Lib.Commodity.sol";

error TokensDecimalsLengthError(uint256 tokensLength, uint256 decimalsLength);
error UnavailableKilos(uint256 kilos, uint256 yourAmount, uint256 diff);
error InsufficientAmount(uint256 yourAmount, uint256 minimumAmount);
error InvalidOwnership(address future, address investor);
error InvalidYield(uint8 minimum, uint8 maximum);

error ZeroAddress(address investor);
error BurnContract(address future);
error InvalidToken(address token);

error InvalidSignature();
error OrderNotFound();
error InternalError();
error Unauthorized();
error NoReentrancy();
error Deactivated();

abstract contract Auth {
    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/
    bool private locked;

    constructor() {}

    /*//////////////////////////////////////////////////////////////
                               MODIFIERS
    //////////////////////////////////////////////////////////////*/

    modifier nonReentrant() {
        if (locked) {
            revert NoReentrancy();
        }
        locked = true;
        _;
        locked = false;
    }

    function zeroAddr(address addr) internal pure {
        if (addr == address(0)) {
            revert ZeroAddress(addr);
        }
    }

    function onlyStableCoins(address token) internal view {
        zeroAddr(token);
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();

        bool condition = true;
        for (uint256 i = 0; i < ds.allowedTokens.length; i++) {
            if (ds.allowedTokens[i] == token) {
                condition = false;
            }
        }
        if (condition) {
            revert InvalidToken(token);
        }
    }

    function onlyKgSupply(uint256 amount) internal view {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();

        if (ds.totalSupplyKg < amount) {
            revert UnavailableKilos(ds.totalSupplyKg, amount, amount - ds.totalSupplyKg);
        }
    }

    function onlyActive(address investor) internal view {
        zeroAddr(investor);
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();

        if (ds.activated == false) {
            revert Deactivated();
        }
    }

    /**
     * @notice This function checks if the sender is the owner of the order.
     * @dev This function reverts the transaction if the investor is a zero address or if the sender is not the investor.
     * @param investor The address of the investor to check.
     */
    function onlyOrderOwner(address investor) internal view {
        if (investor == address(0x0) || msg.sender != investor) {
            revert Unauthorized();
        }
    }

    function revertOrderNotFound() internal pure {
        revert OrderNotFound();
    }

    function revertInternalError() internal pure {
        revert InternalError();
    }

    function minimumAmount(uint256 amount, address tokenAddress) internal view {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();

        if (amount < 10 * 10 ** ds.listAllowedTokens[tokenAddress].decimals) {
            revert InsufficientAmount(amount, 10 * 10 ** ds.listAllowedTokens[tokenAddress].decimals);
        }
    }

    function onlyController() internal view {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        if (ds.controller != msg.sender) {
            revert Unauthorized();
        }
    }

    function validateYield(uint8 newYieldFarming) internal pure {
        // input 1 for yield 1%, if you want to return nothing %, input 0
        if (!(0 <= newYieldFarming && newYieldFarming <= 100)) {
            revert InvalidYield(0, 100);
        }
    }

    function validateTokensDecimalsLength(uint256 tokensLength, uint256 decimalsLength) internal pure {
        if (tokensLength != decimalsLength) {
            revert TokensDecimalsLengthError(tokensLength, decimalsLength);
        }
    }

    function initController(address controller) internal {
        zeroAddr(controller);
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        ds.controller = controller;
    }

    function onlyFutures(address investor, address future) internal view {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();

        zeroAddr(ds.contracts[future].investor);
        zeroAddr(msg.sender);
        zeroAddr(investor);
        zeroAddr(future);

        if (ds.contracts[future].burn == true) {
            revert BurnContract(future);
        }
        if (ds.contracts[future].investor != investor) {
            revert InvalidOwnership(future, investor);
        }
    }
}
