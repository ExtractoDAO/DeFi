// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {EAuth} from "./Commodity.Auth.sol";

abstract contract ECrud is EAuth {
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
    ) EAuth(_tokens, _decimals, _locktime, _kgSupply, _buyPrice, _sellPrice, _active, _dao, _cow) {}

    /*//////////////////////////////////////////////////////////////
                                ADD
    //////////////////////////////////////////////////////////////*/

    function addAddressWhitelist(address newVip) public {
        onlyOwner();

        Vip memory vip = Vip(vips.length, true);
        whitelist[newVip] = vip;
        vips.push(newVip);
    }

    function addTokens(address newToken, uint8 decimal) public {
        onlyOwner();

        TokenAndDecimals memory token = TokenAndDecimals(tokens.length, decimal, true);
        tokenList[newToken] = token;
        tokens.push(newToken);
    }

    /*//////////////////////////////////////////////////////////////
                                GET
    //////////////////////////////////////////////////////////////*/

    function getContractsByInvestor(address investor) public view returns (Contract[] memory) {
        return contractsByInvestor[investor];
    }

    function getWhiteList() public view returns (address[] memory) {
        return vips;
    }

    function getFullDrawer() public view returns (address[] memory) {
        return drawer;
    }

    function getTokens() public view returns (address[] memory) {
        return tokens;
    }

    function filterOrderBy(OrderType typed) private view returns (Order[] memory) {
        uint256 count;
        for (uint256 j = 0; j < orderBook.length; j++) {
            if (orderBook[j].typed == typed) {
                count++;
            }
        }
        Order[] memory orders = new Order[](count);
        uint256 i;

        for (uint256 j = 0; j < orderBook.length; j++) {
            if (orderBook[j].typed == typed) {
                orders[i] = orderBook[j];
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

    /*//////////////////////////////////////////////////////////////
                                UPDATE
    //////////////////////////////////////////////////////////////*/

    function updateActive(bool state) public {
        onlyOwner();

        getActivated = state;

        if (getActivated) {
            emit OnSale(getTotalSupplyKG);
        }
    }

    function updateBuyPrice(uint256 newBuyPrice) public {
        onlyOwner();

        getBuyPrice = newBuyPrice;

        emit WeightPriceUpdated(newBuyPrice);
    }

    function updateLockTime(uint256 newLockTime) public {
        onlyOwner();

        getLockTime = newLockTime;
    }

    function updateSellPrice(uint256 newSellPrice) public {
        onlyOwner();

        getSellPrice = newSellPrice;

        emit WeightPriceUpdated(newSellPrice);
    }

    function updateYieldFarming(uint256 newYieldFarming) public {
        onlyOwner();
        // input 1 for yield 1%, if you want to return nothing %, input 0
        require(0 <= newYieldFarming && newYieldFarming <= 100, "INVALID_YIELD");
        getYieldFarming = newYieldFarming;
    }

    /*//////////////////////////////////////////////////////////////
                                DELETE
    //////////////////////////////////////////////////////////////*/

    function delTokens(address noauth) public {
        onlyOwner();

        tokenList[noauth].active = false;
        tokens[tokenList[noauth].index] = tokens[tokens.length - 1];
        tokens.pop();
    }

    function delAddressWhitelist(address novip) public {
        onlyOwner();

        whitelist[novip].active = false;
        vips[whitelist[novip].index] = vips[vips.length - 1];
        vips.pop();
    }
}
