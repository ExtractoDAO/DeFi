// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {EEvents} from "./Commodity.Events.sol";
import {COW} from "../../token/COW.sol";

abstract contract EStorage is EEvents {
    /*//////////////////////////////////////////////////////////////
                        STORAGE CONTRACTS
    //////////////////////////////////////////////////////////////*/

    COW immutable cow;

    /*//////////////////////////////////////////////////////////////
                        STORAGE PRIMITIVES
    //////////////////////////////////////////////////////////////*/

    uint256 public getTotalSupplyKG;
    uint256 public getYieldFarming;
    address public immutable owner;
    address public immutable dao;
    uint256 public getSellPrice;
    uint256 public getBuyPrice;
    uint256 public getLockTime;
    bool public getActivated;

    /*//////////////////////////////////////////////////////////////
                        STORAGE ARRAYS
    //////////////////////////////////////////////////////////////*/

    address[] internal tokens;
    address[] public drawer;
    address[] internal vips;
    Order[] public orderBook;

    /*//////////////////////////////////////////////////////////////
                        STORAGE ENUMS
    //////////////////////////////////////////////////////////////*/

    enum OrderType {
        Buy, // 1 = buy order
        Sell // 0 = sell order
    }

    /*//////////////////////////////////////////////////////////////
                        STORAGE STRUCS
    //////////////////////////////////////////////////////////////*/

    struct Order {
        uint256 commodityAmount;
        uint256 amount;
        address tokenAddress;
        address future;
        address investor;
        OrderType typed;
    }

    struct Contract {
        address investor;
        address future;
        uint256 kg;
        bool burn;
    }

    struct TokenAndDecimals {
        uint256 index;
        uint8 decimals;
        bool active;
    }

    struct Vip {
        uint256 index;
        bool active;
    }

    /*//////////////////////////////////////////////////////////////
                        STORAGE MAPPINGS
    //////////////////////////////////////////////////////////////*/

    mapping(address => Contract[]) internal contractsByInvestor;
    mapping(address => TokenAndDecimals) internal tokenList;
    mapping(address => Contract) public getContract;
    mapping(address => Vip) internal whitelist;

    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
        address[] memory _tokens,
        uint8[] memory decimals,
        uint256 _lockTime,
        uint256 _kgSupply,
        uint256 _buyPrice,
        uint256 _sellPrice,
        bool _active,
        address _dao,
        address _cow
    ) {
        require(_tokens.length == decimals.length, "TOKENS_DECIMALS_LENGTH_ERROR");
        require(msg.sender != address(0x0), "ZERO_ADDRESS");
        getTotalSupplyKG = _kgSupply;
        getSellPrice = _sellPrice;
        getBuyPrice = _buyPrice;
        getLockTime = _lockTime;
        getActivated = _active;
        owner = msg.sender;
        cow = COW(_cow);
        dao = _dao;

        for (uint256 i = 0; i < _tokens.length; i++) {
            tokenList[_tokens[i]] = TokenAndDecimals(i, decimals[i], true);
            tokens.push(_tokens[i]);
        }
    }
}
