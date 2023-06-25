// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {CommodityStorageLib} from "../../diamond/libraries/Lib.Commodity.sol";
import {DexStorageLib} from "../../diamond/libraries/Lib.Dex.sol";
import {ERC20} from "../../../token/ERC20.sol";

error TokensDecimalsLengthError(uint256 tokensLength, uint256 decimalsLength);
error UnavailableKilos(uint256 kilos, uint256 yourAmount, uint256 diff);
error InsufficientAllowance(uint256 need, uint256 have, uint256 diff);
error InsufficientAmount(uint256 yourAmount, uint256 minimumAmount);
error PaymentFailed(address from, address to, uint256 amount);
error InvalidFutureOwnership(address future, address investor);
error InvalidOrderOwnership(address investor, bytes32 orderId);
error InvalidYield(uint8 minimum, uint8 maximum);

error FutureNotExists(address future);
error ZeroAddress(address investor);
error BurnContract(address future);
error InvalidToken(address token);
error OrderNotFound(bytes32 id);

error InvalidSignature();
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
        CommodityStorageLib.Storage storage lib = CommodityStorageLib.getCommodityStorage();

        bool condition = true;
        for (uint256 i = 0; i < lib.allowedTokensList.length; i++) {
            if (lib.allowedTokensList[i] == token) {
                condition = false;
            }
        }
        if (condition) {
            revert InvalidToken(token);
        }
    }

    function onlyKgSupply(uint256 amount) internal view {
        CommodityStorageLib.Storage storage lib = CommodityStorageLib.getCommodityStorage();

        if (lib.totalCommoditySupply < amount) {
            revert UnavailableKilos(lib.totalCommoditySupply, amount, amount - lib.totalCommoditySupply);
        }
    }

    function onlyActive() internal view {
        CommodityStorageLib.Storage storage lib = CommodityStorageLib.getCommodityStorage();

        if (lib.activated == false) {
            revert Deactivated();
        }
    }

    function revertOrderNotFound(bytes32 id) internal pure {
        revert OrderNotFound(id);
    }

    function revertInternalError() internal pure {
        revert InternalError();
    }

    function minimumAmount(uint256 amount, address tokenAddress) internal view {
        CommodityStorageLib.Storage storage lib = CommodityStorageLib.getCommodityStorage();

        if (amount < 10 * 10 ** lib.allowedTokens[tokenAddress].decimals) {
            revert InsufficientAmount(amount, 10 * 10 ** lib.allowedTokens[tokenAddress].decimals);
        }
    }

    function onlyController() internal view {
        CommodityStorageLib.Storage storage lib = CommodityStorageLib.getCommodityStorage();
        if (lib.controller != msg.sender) {
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
        CommodityStorageLib.Storage storage lib = CommodityStorageLib.getCommodityStorage();
        lib.controller = controller;
    }

    function onlyNotBurnedFutures(address future) internal view {
        CommodityStorageLib.Storage storage lib = CommodityStorageLib.getCommodityStorage();

        if (lib.contracts[future].burn == true) {
            revert BurnContract(future);
        }
    }

    function onlyFutures(address future) internal view {
        CommodityStorageLib.Storage storage lib = CommodityStorageLib.getCommodityStorage();

        if (lib.contracts[future].investor == address(0x0)) {
            revert FutureNotExists(future);
        }
    }

    function onlyOwnerOfFutures(address investor, address future) internal view {
        CommodityStorageLib.Storage storage lib = CommodityStorageLib.getCommodityStorage();

        if (lib.contracts[future].investor != investor) {
            revert InvalidFutureOwnership(future, investor);
        }
    }

    function onlyOwnerOfOrder(bytes32 id) internal view {
        DexStorageLib.Storage storage lib = DexStorageLib.getDexStorage();

        if (lib.orderByInvestorById[msg.sender][id].investor != msg.sender) {
            revert InvalidOrderOwnership(msg.sender, id);
        }
    }

    function validatePayment(address tokenAddr, uint256 amount) internal {
        CommodityStorageLib.Storage storage lib = CommodityStorageLib.getCommodityStorage();
        validateAllowance(tokenAddr, msg.sender, address(this), amount);
        ERC20 token = ERC20(tokenAddr);

        if (token.transferFrom(msg.sender, lib.dao, amount) == false) {
            revert PaymentFailed(msg.sender, lib.dao, amount);
        }
    }

    function validatePayment(address tokenAddr, address from, address to, uint256 amount) internal {
        validateAllowance(tokenAddr, from, address(this), amount);
        ERC20 token = ERC20(tokenAddr);

        if (token.transferFrom(from, to, amount) == false) {
            revert PaymentFailed(from, to, amount);
        }
    }

    function validateAllowance(address tokenAddr, address investor, address commodity, uint256 amount) internal view {
        ERC20 token = ERC20(tokenAddr);
        uint256 allowance = token.allowance(investor, commodity);

        if (allowance != amount) {
            uint256 need = amount;
            uint256 have = allowance;
            uint256 diff = need - have;
            revert InsufficientAllowance(need, have, diff);
        }
    }
}
