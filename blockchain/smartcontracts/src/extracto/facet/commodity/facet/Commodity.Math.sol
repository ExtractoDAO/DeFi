// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {div, ud60x18, unwrap, UD60x18, mul} from "../../../../utils/math/UD60x18.sol";
import {CommodityStorageLib} from "../../../diamond/libraries/Lib.Commodity.sol";
import {UD60x18} from "../../../../utils/math/Type.sol";
import {Crud} from "./Commodity.Crud.sol";

abstract contract Math is Crud {
    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor() Crud() {}

    /*//////////////////////////////////////////////////////////////
                               BASE LOGIC
    //////////////////////////////////////////////////////////////*/

    function calculateBuyKg(uint256 amount, uint8 precision) internal view returns (uint256) {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();

        // (amount / weightPrice) / precision
        return unwrap(div(div(ud60x18(amount), ud60x18(ds.buyPrice)), ud60x18(10 ** (precision - 2))));
    }

    function calculateNewSupply(uint256 amount) internal {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib.getCommodityStorage();

        // getTotalSupplyKG - amount
        ds.totalSupplyKg = unwrap(ud60x18(ds.totalSupplyKg).sub(ud60x18(amount)));
    }
}
