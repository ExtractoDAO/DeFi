// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {div, ud60x18, unwrap, UD60x18, mul} from "../../../../../utils/math/UD60x18.sol";
import {CommodityStorageLib} from "../../../../diamond/libraries/Lib.Commodity.sol";
import {UD60x18} from "../../../../../utils/math/Type.sol";
import {AuthV2} from "./Commodity.Auth.V2.sol";

abstract contract MathV2 is AuthV2 {
    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor() AuthV2() {}

    function calculateSellAmountYielded(
        uint256 kg
    ) internal view returns (uint256) {
        CommodityStorageLib.Storage storage ds = CommodityStorageLib
            .getCommodityStorage();

        // yieldedKg = (kg * (1 + yieldFarming/100))
        // betterPrecisionYieldKd = yieldedKg / 1^18
        // kgInDolar = betterPrecisionYieldKd * weightPrice
        // kgInCow = kgInDolar / 0.1

        UD60x18 COW_TOKEN_PRICE_IN_DOLAR = div(ud60x18(1), ud60x18(10));
        uint256 BETTER_PRECISION = 1e18;
        uint256 PERCENTAGE = 100;
        return
            unwrap(
                mul(
                    mul(
                        div(
                            div(
                                mul(ud60x18(kg), ud60x18(ds.yieldFarming)),
                                ud60x18(PERCENTAGE)
                            ).add(ud60x18(kg)),
                            ud60x18(BETTER_PRECISION)
                        ),
                        ud60x18(ds.sellPrice)
                    ),
                    COW_TOKEN_PRICE_IN_DOLAR
                )
            );
    }
}
