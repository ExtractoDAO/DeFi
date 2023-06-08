// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ECrud} from "./Commodity.Crud.sol";
import {div, ud60x18, unwrap, UD60x18, mul} from "../../../utils/math/UD60x18.sol";
import {UD60x18} from "../../../utils/math/Type.sol";

abstract contract EBase is ECrud {
    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
        address[] memory _tokens,
        uint8[] memory _decimals,
        uint256 _locktime,
        uint256 _kgSupply,
        uint256 _buyPrice,
        uint256 _sellPrice,
        bool _active,
        address _dao,
        address _cow
    ) ECrud(_tokens, _decimals, _locktime, _kgSupply, _buyPrice, _sellPrice, _active, _dao, _cow) {}

    /*//////////////////////////////////////////////////////////////
                               BASE LOGIC
    //////////////////////////////////////////////////////////////*/

    function calculateBuyKg(uint256 amount, uint8 precision) internal view returns (uint256) {
        // (amount / weightPrice) / precision
        return unwrap(div(div(ud60x18(amount), ud60x18(getBuyPrice)), ud60x18(10 ** (precision - 2))));
    }

    function calculateNewSupply(uint256 amount) internal {
        // getTotalSupplyKG - amount
        getTotalSupplyKG = unwrap(ud60x18(getTotalSupplyKG).sub(ud60x18(amount)));
    }

    function calculateSellAmountYielded(uint256 kg) internal view returns (uint256) {
        // yieldedKg = (kg * (1 + yieldFarming/100))
        // betterPrecisionYieldKd = yieldedKg / 1^18
        // kgInDolar = betterPrecisionYieldKd * weightPrice
        // kgInCow = kgInDolar / 0.1

        UD60x18 COW_TOKEN_PRICE_IN_DOLAR = div(ud60x18(1), ud60x18(10));
        uint256 BETTER_PRECISION = 1e18;
        uint256 PERCENTAGE = 100;
        return unwrap(
            mul(
                mul(
                    div(
                        div(mul(ud60x18(kg), ud60x18(getYieldFarming)), ud60x18(PERCENTAGE)).add(ud60x18(kg)),
                        ud60x18(BETTER_PRECISION)
                    ),
                    ud60x18(getSellPrice)
                ),
                COW_TOKEN_PRICE_IN_DOLAR
            )
        );
    }
}
