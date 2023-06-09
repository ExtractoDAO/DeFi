// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {COW} from "../../../token/COW.sol";
import {Contract, TokenAndDecimals} from "../interfaces/Types.sol";
import {InvalidYield, NoAuthorized} from "../interfaces/Types.sol";

library CommodityStorageLib {
    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.commodity.storage");
    address constant ZERO_ADDRESS = address(0x0);

    /*////////////////////////////////////////////////////////////
                                                           STRUCT
    ////////////////////////////////////////////////////////////*/

    struct Storage {
        COW cow;
        //
        address controller;
        address dao;
        //
        uint256 totalSupplyKg;
        uint256 yieldFarming;
        uint256 sellPrice;
        uint256 buyPrice;
        uint256 locktime;
        bool activated;
        //
        address[] allowedTokens;
        address[] drawer;
        //
        mapping(address => Contract[]) contractsByInvestor;
        mapping(address => TokenAndDecimals) listAllowedTokens;
        mapping(address => Contract) contracts;
    }

    /*////////////////////////////////////////////////////////////
                                                    GET FUNCTIONS
    ////////////////////////////////////////////////////////////*/

    /// @notice This function retrieves the diamond storage struct which is declared in a specific storage slot.
    /// @dev The diamond storage struct is stored at a specific storage slot to prevent clashes with other state variables in the contract.
    /// @return ds Returns an instance of the Storage struct (representing the diamond storage).
    function getCommodityStorage() internal pure returns (Storage storage ds) {
        bytes32 storagePosition = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := storagePosition
        }
    }

    function getTotalSupplyKG() public view returns (uint256 totalSupplyKg) {
        Storage storage ds = getCommodityStorage();
        totalSupplyKg = ds.totalSupplyKg;
    }

    function getYieldFarming() public view returns (uint256 yieldFarming) {
        Storage storage ds = getCommodityStorage();
        yieldFarming = ds.yieldFarming;
    }

    function getSellPrice() public view returns (uint256 sellPrice) {
        Storage storage ds = getCommodityStorage();
        sellPrice = ds.sellPrice;
    }

    function getBuyPrice() public view returns (uint256 buyPrice) {
        Storage storage ds = getCommodityStorage();
        buyPrice = ds.buyPrice;
    }

    function getLocktime() public view returns (uint256 locktime) {
        Storage storage ds = getCommodityStorage();
        locktime = ds.locktime;
    }

    function getActivated() public view returns (bool activated) {
        Storage storage ds = getCommodityStorage();
        activated = ds.activated;
    }

    function getFullDrawer() public view returns (address[] memory drawer) {
        Storage storage ds = getCommodityStorage();
        drawer = ds.drawer;
    }

    function getContractsByInvestor(address investor) public view returns (Contract[] memory contractsInvestor) {
        Storage storage ds = getCommodityStorage();
        contractsInvestor = ds.contractsByInvestor[investor];
    }

    function getallowedTokens() internal view returns (address[] memory tokens) {
        Storage storage ds = getCommodityStorage();
        tokens = ds.allowedTokens;
    }

    function getallowedTokensLength() internal view returns (uint256 length) {
        Storage storage ds = getCommodityStorage();
        length = ds.allowedTokens.length;
    }

    function getDao() internal view returns (address dao) {
        Storage storage ds = getCommodityStorage();
        dao = ds.dao;
    }

    function getController() internal view returns (address controller) {
        Storage storage ds = getCommodityStorage();
        controller = ds.controller;
    }

    function getCOW() internal view returns (COW cow) {
        Storage storage ds = getCommodityStorage();
        cow = ds.cow;
    }

    /*////////////////////////////////////////////////////////////
                                                    SET FUNCTIONS
    ////////////////////////////////////////////////////////////*/

    function setController(address newController) internal {
        Storage storage ds = getCommodityStorage();
        ds.controller = newController;
    }

    // TODO: add multisig
    function setDAO(address newDAO) external {
        onlyController();
        Storage storage ds = getCommodityStorage();
        ds.dao = newDAO;
    }

    function setCOW(address newCow) external {
        onlyController();
        Storage storage ds = getCommodityStorage();
        ds.cow = COW(newCow);
    }

    /*////////////////////////////////////////////////////////////
                                              VALIDATION FUNCTIONS
    ////////////////////////////////////////////////////////////*/

    function onlyController() internal view {
        Storage storage ds = getCommodityStorage();
        if (ds.controller != msg.sender) {
            revert NoAuthorized();
        }
    }

    /*//////////////////////////////////////////////////////////////
                                ADD
    //////////////////////////////////////////////////////////////*/

    function addTokens(address newToken, uint8 decimal) public {
        onlyController();
        Storage storage ds = getCommodityStorage();

        TokenAndDecimals memory token = TokenAndDecimals(getallowedTokensLength(), decimal, true);
        ds.listAllowedTokens[newToken] = token;
        ds.allowedTokens.push(newToken);
    }

    /*//////////////////////////////////////////////////////////////
                                UPDATE
    //////////////////////////////////////////////////////////////*/

    // TODO: Pausable ???
    // function updateActive(bool state) public {
    //     onlyController();

    //     getActivated = state;

    //     if (getActivated) {
    //         emit OnSale(getTotalSupplyKG);
    //     }
    // }

    function updateBuyPrice(uint256 newBuyPrice) public {
        onlyController();
        Storage storage ds = getCommodityStorage();

        ds.buyPrice = newBuyPrice;
    }

    function updateLockTime(uint256 newLockTime) public {
        onlyController();
        Storage storage ds = getCommodityStorage();

        ds.locktime = newLockTime;
    }

    function updateSellPrice(uint256 newSellPrice) public {
        onlyController();
        Storage storage ds = getCommodityStorage();

        ds.sellPrice = newSellPrice;
    }

    function updateYieldFarming(uint256 newYieldFarming) public {
        Storage storage ds = getCommodityStorage();
        onlyController();

        // input 1 for yield 1%, if you want to return nothing %, input 0
        if (!(0 <= newYieldFarming && newYieldFarming <= 100)) {
            revert InvalidYield();
        }
        ds.yieldFarming = newYieldFarming;
    }

    /*//////////////////////////////////////////////////////////////
                                DELETE
    //////////////////////////////////////////////////////////////*/

    function delTokens(address noauth) public {
        onlyController();
        Storage storage ds = getCommodityStorage();

        ds.listAllowedTokens[noauth].active = false;
        ds.allowedTokens[ds.listAllowedTokens[noauth].index] = ds.allowedTokens[ds.allowedTokens.length - 1];
        ds.allowedTokens.pop();
    }
}
