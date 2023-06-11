// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {CommodityStorageLib} from "../../../../diamond/libraries/Lib.Commodity.sol";
import {Auth, BurnContract, InvalidOwnership} from "../Commodity.Auth.sol";


abstract contract AuthV2 is Auth {
    constructor() Auth() {}

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