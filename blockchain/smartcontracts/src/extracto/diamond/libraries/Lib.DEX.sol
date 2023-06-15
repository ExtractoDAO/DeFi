// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {COW} from "../../../token/COW.sol";
import {NoAuthorized} from "../interfaces/Types.sol";

library DEXStorageLib {
    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.dex.storage");
    address constant ZERO_ADDRESS = address(0x0);

    /*////////////////////////////////////////////////////////////
                                                           STRUCT
    ////////////////////////////////////////////////////////////*/

    enum OrderType {
        Buy, // 1 = buy order
        Sell // 0 = sell order
    }

    struct Order {
        uint256 commodityAmount;
        uint256 amount;
        address tokenAddress;
        address future;
        address investor;
        OrderType typed;
    }

    struct Storage {
        address controller;
        Order[] orderBook;
    }

    /*////////////////////////////////////////////////////////////
                                                    GET FUNCTIONS
    ////////////////////////////////////////////////////////////*/

    /// @notice This function retrieves the diamond storage struct which is declared in a specific storage slot.
    /// @dev The diamond storage struct is stored at a specific storage slot to prevent clashes with other state variables in the contract.
    /// @return lib Returns an instance of the Storage struct (representing the diamond storage).
    function getDEXStorage() internal pure returns (Storage storage lib) {
        bytes32 storagePosition = DIAMOND_STORAGE_POSITION;
        assembly {
            lib.slot := storagePosition
        }
    }

    /*//////////////////////////////////////////////////////////////
                                GET
    //////////////////////////////////////////////////////////////*/

    function getController() internal view returns (address controller) {
        Storage storage lib = getDEXStorage();
        controller = lib.controller;
    }

    /*////////////////////////////////////////////////////////////
                                                    SET FUNCTIONS
    ////////////////////////////////////////////////////////////*/

    function setController(address newController) internal {
        Storage storage lib = getDEXStorage();
        lib.controller = newController;
    }

    /*////////////////////////////////////////////////////////////
                                              VALIDATION FUNCTIONS
    ////////////////////////////////////////////////////////////*/

    function onlyController() internal view {
        Storage storage lib = getDEXStorage();
        if (lib.controller != msg.sender) {
            revert NoAuthorized();
        }
    }
}
