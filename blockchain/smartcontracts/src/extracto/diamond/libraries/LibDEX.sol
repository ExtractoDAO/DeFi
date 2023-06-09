// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {COW} from "../../../token/COW.sol";
import {Order, OrderType} from "../interfaces/Types.sol";
import {NoAuthorized} from "../interfaces/Types.sol";

library DEXStorageLib {
    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.dex.storage");
    address constant ZERO_ADDRESS = address(0x0);

    /*////////////////////////////////////////////////////////////
                                                           STRUCT
    ////////////////////////////////////////////////////////////*/

    struct Storage {
        address controller;
        Order[] orderBook;
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

    /*//////////////////////////////////////////////////////////////
                                GET
    //////////////////////////////////////////////////////////////*/

    function filterOrderBy(OrderType typed) private view returns (Order[] memory) {
        Storage storage ds = getCommodityStorage();

        uint256 count;
        for (uint256 j = 0; j < ds.orderBook.length; j++) {
            if (ds.orderBook[j].typed == typed) {
                count++;
            }
        }

        Order[] memory orders = new Order[](count);
        uint256 i;

        for (uint256 j = 0; j < ds.orderBook.length; j++) {
            if (ds.orderBook[j].typed == typed) {
                orders[i] = ds.orderBook[j];
                i++;
            } else {
                continue;
            }
        }

        return orders;
    }

    function sellOrders() external view returns (Order[] memory) {
        return filterOrderBy(OrderType.Sell);
    }

    function buyOrders() external view returns (Order[] memory) {
        return filterOrderBy(OrderType.Buy);
    }

    function getController() internal view returns (address controller) {
        Storage storage ds = getCommodityStorage();
        controller = ds.controller;
    }

    /*////////////////////////////////////////////////////////////
                                                    SET FUNCTIONS
    ////////////////////////////////////////////////////////////*/

    function setController(address newController) internal {
        Storage storage ds = getCommodityStorage();
        ds.controller = newController;
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
}
