// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Future} from "../future/Future.sol";
import {ERC20} from "../../token/ERC20.sol";
import {EBase} from "./Commodity.Base.sol";
import "../../utils/math/UD60x18.sol";

contract Commodity is EBase {
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
    ) EBase(_tokens, _decimals, _locktime, _kgSupply, _buyPrice, _sellPrice, _active, _dao, _cow) {}

    /*//////////////////////////////////////////////////////////////
                               Commodity LOGIC
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Mints COW tokens for the investor based on a futures contract.
     * @dev 1. onlyFutures: Only a futures contract issued by the Commodity can call this function.
     * @dev 2. The futures contract (msg.sender) will marked as burned.
     * @dev 3. The total number of COW tokens to be sent to the owner of the futures contract is calculated using `calculateSellAmountYielded`.
     * @dev 4. The COW Contract sends the tokens to the investor.
     * @param commodityAmount The amount of commodity used as the basis for calculating the investor's payout.
     * @param investor The address of the owner of the futures contract who will receive the tokens. The tokens will be received by the investor, not by the contract.
     */
    function mintToken(uint256 commodityAmount, address investor) external nonReentrant {
        onlyFutures(investor, msg.sender);
        getContract[msg.sender].burn = true;

        uint256 amount = calculateSellAmountYielded(commodityAmount);

        // TODO: update to ProxyCOW
        cow.pay(investor, amount);

        emit TokensMinted(amount, investor);
    }

    /**
     * @notice Creates a new Future contract with the specified parameters.
     * @dev 1. The `msg.sender` must have sufficient balance of the specified token.
     * @dev 2. The specified token must be a stablecoin.
     * @dev 3. The specified amount of KG must be available in the system.
     * @dev 4. The `msg.sender` must be a VIP investor if Commodity off sales mode is enabled.
     * @dev 5. Calculates the amount of KG to be minted based on the token amount and its decimals.
     * @dev 6. Creates a new Future contract with the specified KG and `msg.sender` as the owner.
     * @dev 7. Adds the new Future contract to the list of contracts by investor and drawer.
     * @dev 8. Transfers the specified token amount from `msg.sender` to the DAO.
     * @param tokenAddress The address of the token to be used to create the Future contract.
     * @param amount The amount of tokens to be used to create the Future contract.
     * @return future The address of the newly created Future contract.
     * @return kg The amount of KG minted for the new Future contract.
     */
    function createFuture(address tokenAddress, uint256 amount)
        external
        nonReentrant
        returns (address future, uint256 kg)
    {
        require(amount >= 10 * 10 ** tokenList[tokenAddress].decimals, "INSUFFICIENT_AMOUNT");
        onlyStableCoins(tokenAddress);
        onlyKgSupply(amount);
        onlyActive(msg.sender);

        calculateNewSupply(amount);
        kg = calculateBuyKg(amount, tokenList[tokenAddress].decimals);

        Future futureContract = new Future(kg, msg.sender, getLockTime);
        future = address(futureContract);

        contractsByInvestor[msg.sender].push(Contract(msg.sender, future, kg, false));
        getContract[future] = Contract(msg.sender, future, kg, false);
        drawer.push(future);

        emit FutureCreated(future, kg, msg.sender, getLockTime);

        ERC20 token = ERC20(tokenAddress);
        bool sent = token.transferFrom(msg.sender, dao, amount);
        require(sent, "PAYMENT_FAILED");
    }

    /**
     * @notice Finds an order in the order book that matches the specified order.
     * @dev 1. This function iterates through the order book to find an order that matches the specified order.
     * @param order The order to search for in the order book.
     * @return result True if the order is found, false otherwise.
     * @return index The index of the order in the order book, or 0 if the order is not found.
     */
    function findOrder(Order memory order) private view returns (bool result, uint256 index) {
        for (index = 0; index < orderBook.length; index++) {
            //
            if (orderBook[index].typed != order.typed) {
                continue;
            } else {
                Order storage _order = orderBook[index];
                //
                result = true;
                result = result && _order.commodityAmount == order.commodityAmount;
                result = result && _order.tokenAddress == order.tokenAddress;
                result = result && _order.investor == order.investor;
                result = result && _order.amount == order.amount;
                result = result && _order.future == order.future;
                //
                if (result) {
                    return (result, index);
                } else {
                    continue;
                }
            }
        }
        //
        index = 0;
    }

    /**
     * @notice Finds an order in the order book with the specified commodity amount, amount, and order type.
     * @param commodityAmount The commodity amount of the order to find.
     * @param amount The amount of the order to find.
     * @param typed The order type of the order to find.
     * @return value Whether an order was found or not.
     * @return index The index of the found order in the order book.
     */
    function findOrder(uint256 commodityAmount, uint256 amount, OrderType typed)
        private
        view
        returns (bool value, uint256 index)
    {
        for (index = 0; index < orderBook.length; index++) {
            //
            if (orderBook[index].typed != typed) {
                continue;
            } else {
                Order storage order = orderBook[index];
                value = order.commodityAmount == commodityAmount && order.amount == amount;

                if (value) {
                    return (value, index);
                } else {
                    continue;
                }
            }
        }
        index = 0;
    }

    ////////////////////////////////////////////////////////////////
    /// DEX LOGIC
    ////////////////////////////////////////////////////////////////

    /**
     * @notice User makes sales order
     * @dev 1. Only a user who owns the contract can put it up for sale
     * @dev 2. only if you have a purchase order equal to the sales order will you have a (match)
     * @dev 3. If the match happens, the contract will be sent to the buyer and ok tokens to the seller
     * @param investor The address of the user who owns the contract
     * @param rawCommodityAmount The amount of commodity the user wants to sell
     * @param amount The value that the user wants in his sales order
     */
    function sellOrder(address investor, uint256 rawCommodityAmount, uint256 amount) external {
        onlyFutures(investor, msg.sender);
        uint256 commodityAmount = unwrap(floor(ud60x18(rawCommodityAmount)));

        (bool _match, uint256 index) = findOrder(commodityAmount, amount, OrderType.Buy);

        Order memory sell;
        sell.commodityAmount = commodityAmount;
        sell.tokenAddress = address(0x0);
        sell.future = msg.sender;
        sell.investor = investor;
        sell.amount = amount;
        sell.typed = OrderType.Sell;

        if (_match) {
            swap(orderBook[index], sell);
        } else {
            orderBook.push(sell);
        }
    }

    /**
     * @notice Allows a user to create a buy order for a future contract.
     * @dev 1. This function can only be called by a user who wants to create a buy order for a future contract.
     * @dev 2. The payment token must be a stablecoin, and this check is enforced by the `onlyStableCoins` modifier.
     * @dev 3. If a matching sell order is found, the function executes the trade by calling the `swap` function.
     * @dev 4. If no matching sell order is found, the function adds the buy order to the order book.
     * @param tokenAddress The address of the payment token to be used for the purchase.
     * @param commodityAmount The amount of commodity the user wants to purchase.
     * @param amount The amount of payment tokens the user is willing to pay for the commodity.
     */
    function buyOrder(address tokenAddress, uint256 commodityAmount, uint256 amount) external {
        onlyStableCoins(tokenAddress);

        (bool _match, uint256 index) = findOrder(commodityAmount, amount, OrderType.Sell);

        Order memory buy;
        buy.commodityAmount = commodityAmount;
        buy.tokenAddress = tokenAddress;
        buy.future = address(0x0);
        buy.investor = msg.sender;
        buy.amount = amount;
        buy.typed = OrderType.Buy;

        if (_match) {
            swap(buy, orderBook[index]);
        } else {
            orderBook.push(buy);
        }
    }

    /**
     * @notice Allows a user to cancel an existing order.
     * @dev 1. This function can only be called by the owner of the order, checked by the `onlyOrderOwner` function.
     * @dev 2. The function attempts to find the order in the order book.
     * @dev 3. If the order is not found, the function reverts.
     * @dev 4. If the order is found, the function removes the order from the order book.
     * @param order The order to be cancelled.
     */
    function cancelOrder(Order calldata order) external {
        onlyOrderOwner(order.investor);

        (bool match_, uint256 index) = findOrder(order);

        if (match_ != true) {
            revertOrderNotFound();
        } else {
            // remover order from order book
            orderBook[index] = orderBook[orderBook.length - 1];
            orderBook.pop();
        }
    }

    /**
     * @notice Removes an order from the order book.
     * @dev 1. This function is only accessible within the contract.
     * @dev 2. The function iterates over the order book to find the order that matches the given parameters.
     * @dev 3. If the order is found, it is removed from the order book.
     * @param order The order to be removed from the order book.
     * @return A boolean indicating whether the order was successfully removed.
     */
    function removeOrder(Order memory order) private returns (bool) {
        for (uint256 index = 0; index < orderBook.length; index++) {
            //
            if (orderBook[index].typed != order.typed) {
                continue;
            } else {
                Order storage _order = orderBook[index];
                //
                bool result = true;
                result = result && _order.commodityAmount == order.commodityAmount;
                result = result && _order.tokenAddress == order.tokenAddress;
                result = result && _order.investor == order.investor;
                result = result && _order.amount == order.amount;
                result = result && _order.future == order.future;
                //
                if (result) {
                    orderBook[index] = orderBook[orderBook.length - 1];
                    orderBook.pop();
                    return true;
                } else {
                    continue;
                }
            }
        }
        //
        return false;
    }

    /**
     * @notice Swaps two orders in the order book.
     * @dev 1. This function is only accessible within the contract.
     * @dev 2. The function attempts to remove both the buy and sell orders from the order book.
     * @dev 3. If either order is not found, the function reverts.
     * @dev 4. The function changes the owner of the contract in memory.
     * @dev 5. The function removes the contract from the list of the old investor and pushes it to the list of the new investor.
     * @dev 6. The function transfers the token from the buyer to the seller.
     * @dev 7. The function swaps the future between the two investors.
     * @param buy The buy order.
     * @param sell The sell order.
     */
    function swap(Order memory buy, Order memory sell) internal {
        // remove buy/sell orders from orderbook
        bool buyrm = removeOrder(buy);
        bool sellrm = removeOrder(sell);

        if (buyrm && sellrm) {
            revertInternalError();
        }

        // change owner of contract in memory
        Contract[] storage futures = contractsByInvestor[sell.investor];
        getContract[sell.future].investor = buy.investor;

        // remove contract from list of old investor
        // push to list of new investor
        for (uint256 i = 0; i < futures.length; i++) {
            if (futures[i].investor == sell.investor) {
                // push to list of new investor
                contractsByInvestor[buy.investor].push(futures[i]);
                // remove contract from list of old investor
                futures[i] = futures[futures.length - 1];
                futures.pop();
                break;
            }
        }

        // send Token
        ERC20 token = ERC20(buy.tokenAddress);
        bool sent = token.transferFrom(buy.investor, sell.investor, sell.amount);
        require(sent, "PAYMENT_FAILED");

        // swap on Future
        Future future = Future(sell.future);
        future.swap(buy.investor);
    }
}
