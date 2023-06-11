// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {CommodityStorageLib} from "../../../diamond/libraries/Lib.Commodity.sol";
import {COW} from "../../../../token/COW.sol";
import {Auth} from "./Commodity.Auth.sol";

abstract contract Crud is Auth {
    constructor() Auth() {}

    /*////////////////////////////////////////////////////////////
                                                    GET FUNCTIONS
    ////////////////////////////////////////////////////////////*/

    function getTotalSupplyKG() public view returns (uint256 totalSupplyKg) {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        totalSupplyKg = ds.totalSupplyKg;
    }

    function getYieldFarming() public view returns (uint256 yieldFarming) {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        yieldFarming = ds.yieldFarming;
    }

    function getSellPrice() public view returns (uint256 sellPrice) {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        sellPrice = ds.sellPrice;
    }

    function getBuyPrice() public view returns (uint256 buyPrice) {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        buyPrice = ds.buyPrice;
    }

    function getLocktime() public view returns (uint256 locktime) {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        locktime = ds.locktime;
    }

    function getActivated() public view returns (bool activated) {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        activated = ds.activated;
    }

    function getFullDrawer() external view returns (address[] memory drawer) {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        drawer = ds.drawer;
    }

    function getContractsByInvestor(address investor)
        public
        view
        returns (CommodityStorageLib.Contract[] memory contractsInvestor)
    {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        contractsInvestor = ds.contractsByInvestor[investor];
    }

    function getAllowedTokens() public view returns (address[] memory tokens) {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        tokens = ds.allowedTokens;
    }

    function getAllowedTokensLength() public view returns (uint256 length) {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        length = ds.allowedTokens.length;
    }

    function getDao() public view returns (address dao) {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        dao = ds.dao;
    }

    function getController() public view returns (address controller) {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        controller = ds.controller;
    }

    function getCOW() public view returns (COW cow) {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        cow = ds.cow;
    }

    /*////////////////////////////////////////////////////////////
                                                    SET FUNCTIONS
    ////////////////////////////////////////////////////////////*/

    // TODO: add multisig
    function setController(address newController) public {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        ds.controller = newController;
    }

    // TODO: add multisig
    function setDAO(address newDAO) public {
        onlyController();
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        ds.dao = newDAO;
    }

    function setCOW(address newCow) public {
        onlyController();
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        ds.cow = COW(newCow);
    }

    /*//////////////////////////////////////////////////////////////
                                ADD
    //////////////////////////////////////////////////////////////*/

    function addTokens(address newToken, uint8 decimal) public {
        onlyController();
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();

        CommodityStorageLib.TokenAndDecimals memory token =
            CommodityStorageLib.TokenAndDecimals(getAllowedTokensLength(), decimal, true);
        ds.listAllowedTokens[newToken] = token;
        ds.allowedTokens.push(newToken);
    }

    /*//////////////////////////////////////////////////////////////
                                UPDATE
    //////////////////////////////////////////////////////////////*/

    // TODO: Pausable ???
    function updateActive(bool state) public {
        onlyController();
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();

        ds.activated = state;
    }

    function updateBuyPrice(uint256 newBuyPrice) public {
        onlyController();
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();

        ds.buyPrice = newBuyPrice;
    }

    function updateLockTime(uint256 newLockTime) public {
        onlyController();
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();

        ds.locktime = newLockTime;
    }

    function updateSellPrice(uint256 newSellPrice) public {
        onlyController();
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();

        ds.sellPrice = newSellPrice;
    }

    function updateYieldFarming(uint8 newYieldFarming) public {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();
        onlyController();
        validateYield(newYieldFarming);

        ds.yieldFarming = newYieldFarming;
    }

    /*//////////////////////////////////////////////////////////////
                                DELETE
    //////////////////////////////////////////////////////////////*/

    function delTokens(address noauth) public {
        onlyController();
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();

        ds.listAllowedTokens[noauth].active = false;
        ds.allowedTokens[ds.listAllowedTokens[noauth].index] = ds.allowedTokens[ds.allowedTokens.length - 1];
        ds.allowedTokens.pop();
    }
}
