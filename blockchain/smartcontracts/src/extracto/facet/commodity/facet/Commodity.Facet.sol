// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {CommodityStorageLib} from "../../../diamond/libraries/Lib.Commodity.sol";
import {ERC20} from "../../../../token/ERC20.sol";
import {Future} from "../../future/Future.sol";
import "../../../../utils/math/UD60x18.sol";
import {Math} from "./Commodity.Math.sol";

contract CommodityFacet is Math {
    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor() Math() {}


    function init(
        address[] memory tokens,
        uint8[] memory decimals,
        uint256 locktime,
        uint256 kgSupply,
        uint256 buyPrice,
        uint256 sellPrice,
        bool active,
        address dao,
        address cow
    ) external returns (bool result) {
        validateTokensDecimalsLength(tokens.length, decimals.length);
        zeroAddr(msg.sender);

        initController(msg.sender);
        setCOW(cow);
        setDAO(dao);

        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();

        ds.totalSupplyKg = kgSupply;
        ds.sellPrice = sellPrice;
        ds.buyPrice = buyPrice;
        ds.locktime = locktime;
        ds.activated = active;

        for (uint256 i = 0; i < tokens.length; i++) {
            ds.listAllowedTokens[tokens[i]] = CommodityStorageLib.TokenAndDecimals(i, decimals[i], true);
            ds.allowedTokens.push(tokens[i]);
        }

        result = true;
    }

    /*//////////////////////////////////////////////////////////////
                               Commodity LOGIC
    //////////////////////////////////////////////////////////////*/

    function createFuture(address tokenAddress, uint256 amount)
        external
        nonReentrant
        returns (address future, uint256 kg)
    {
        minimumAmount(amount, tokenAddress);
        onlyStableCoins(tokenAddress);
        onlyKgSupply(amount);
        onlyActive(msg.sender);

        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();

        calculateNewSupply(amount);
        kg = calculateBuyKg(amount, ds.listAllowedTokens[tokenAddress].decimals);

        Future futureContract = new Future(kg, msg.sender, ds.locktime);
        future = address(futureContract);

        ds.contractsByInvestor[msg.sender].push(CommodityStorageLib.Contract(msg.sender, future, kg, false));
        ds.contracts[future] = CommodityStorageLib.Contract(msg.sender, future, kg, false);
        ds.drawer.push(future);

        ERC20 token = ERC20(tokenAddress);
        bool sent = token.transferFrom(msg.sender, ds.dao, amount);
        require(sent, "PAYMENT_FAILED");
    }
}
