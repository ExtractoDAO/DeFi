// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {FAuth} from "./Future.Auth.sol";

abstract contract FBase is FAuth {
    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(uint256 _kg, address _investor, address _dao, uint256 _locktime)
        FAuth(_kg, _investor, _dao, _locktime)
    {}

    /*//////////////////////////////////////////////////////////////
                               BASE LOGIC
    //////////////////////////////////////////////////////////////*/

    function _burn() internal {
        burn = true;
    }
}
