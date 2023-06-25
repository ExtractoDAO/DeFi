// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC20} from "../../../token/ERC20.sol";
import {FBase} from "./Future.Base.sol";

contract Future is FBase {
    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(uint256 _kg, address _investor, uint256 _locktime) FBase(_kg, _investor, msg.sender, _locktime) {}

    /*//////////////////////////////////////////////////////////////
                               FUTURE LOGIC
    //////////////////////////////////////////////////////////////*/

    function withdraw() external nonReentrant {
        burned();
        onlyInvestor();
        timeUnlocked();

        _burn();

        emit Withdraw(getKg, investor);

        extracto.mintToken(getKg, investor);
    }

    function sell(uint256 amount) external returns (bytes32 id) {
        onlyInvestor();

        bytes memory payload = abi.encodeWithSignature("sellOrder(address,uint256)", investor, amount);
        (bool ok, bytes memory data) = address(extracto).call(payload);
        if (!ok) {
            assembly {
                revert(add(data, 32), mload(data))
            }
        } else {
            assembly {
                id := mload(add(data, 32))
            }
        }
    }

    function swap(address newInvestor) external {
        onlyCommodity();

        investor = newInvestor;
    }
}
