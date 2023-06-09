// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {EStorage} from "./Commodity.Storage.sol";
// 'Custom Error 0656b9e8:(0x00000000000000000000000000000000000F4240)


error InvalidOwnership(address future, address investor);

error WithoutWhitelist(address investor);
error UnavailableKilos(uint256 kilos, uint256 yourAmount, uint256 diff);
error ZeroAddress(address investor);
error BurnContract(address future);
error InvalidToken(address token);

error InvalidSignature();
error OrderNotFound();
error InternalError();
error Unauthorized();
error NoReentrancy();

abstract contract EAuth is EStorage {
    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/
    bool private locked;

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
    ) EStorage(_tokens, _decimals, _locktime, _kgSupply, _buyPrice, _sellPrice, _active, _dao, _cow) {}

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

    function onlyOwner() internal view {
        zeroAddr(msg.sender);
        if (msg.sender != owner) {
            revert Unauthorized();
        }
    }

    function onlyFutures(address investor, address future) internal view {
        zeroAddr(getContract[future].investor);
        zeroAddr(msg.sender);
        zeroAddr(investor);
        zeroAddr(future);

        if (getContract[future].burn == true) {
            revert BurnContract(future);
        }
        if (getContract[future].investor != investor) {
            revert InvalidOwnership(future, investor);
        }
    }

    function onlyStableCoins(address token) internal view {
        zeroAddr(token);

        bool condition = true;
        for (uint256 i = 0; i < tokens.length; i++) {
            if (tokens[i] == token) {
                condition = false;
            }
        }
        if (condition) {
            revert InvalidToken(token);
        }
    }

    function onlyKgSupply(uint256 amount) internal view {
        if (getTotalSupplyKG < amount) {
            revert UnavailableKilos(getTotalSupplyKG, amount, amount - getTotalSupplyKG);
        }
    }

    function onlyActive(address investor) internal view {
        zeroAddr(investor);

        if (getActivated == false) {
            if (whitelist[investor].active == false) {
                revert WithoutWhitelist(investor);
            }
        }
    }

    /**
     * @notice This function checks if the sender is the owner of the order.
     * @dev This function reverts the transaction if the investor is a zero address or if the sender is not the investor.
     * @param investor The address of the investor to check.
     */
    function onlyOrderOwner(address investor) internal view {
        if (investor == address(0x0) || msg.sender != investor) {
            revert Unauthorized();
        }
    }

    function revertOrderNotFound() internal pure {
        revert OrderNotFound();
    }

    function revertInternalError() internal pure {
        revert InternalError();
    }
}
