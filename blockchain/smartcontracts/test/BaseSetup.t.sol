// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {Facet, Action} from "../src/extracto/diamond/interfaces/Types.sol";
import {Commodity} from "../src/extracto/facet/commodity/Commodity.sol";
import {Future} from "../src/extracto/facet/future/Future.sol";
import {Diamond} from "../src/extracto/diamond/Diamond.sol";
import {BaseSetup} from "./BaseSetup.t.sol";
import {MockToken} from "./MockToken.t.sol";
import {COW} from "../src/token/COW.sol";
import {Utils} from "./Utils.t.sol";

contract BaseSetup is Utils {
    uint256 _135days_in_blocks_to_unlock = 6_415_200;
    uint256 tokenSupply = 1_000_000_000_000 * 1e18;
    uint256 initialCapital = 100_000 * 1e18;
    uint256 kgSupply = 1_000_000 * 1e18;
    uint256 kgPrice = 1_91 * 1e16;
    bool status = true;
    address controller;
    address investor;
    address deployer;

    address[] tokens;
    uint8[] decimals;
    address[] users;

    Commodity commodity;
    Future future;
    COW cow;

    MockToken xusd;
    MockToken usdc;
    MockToken usdt;
    MockToken busd;
    MockToken dai;

    Diamond diamond;
    Facet[] diamondCut;

    function createMockUsers(address[] memory myUsers) private {
        controller = myUsers[0];
        investor = myUsers[1];
        deployer = myUsers[2];

        vm.label(deployer, "deployer (dev)");
        vm.label(controller, "controller");
        vm.label(investor, "investor");
    }

    function createMockToken() private {
        vm.startPrank(controller);
        usdc = new MockToken("USDC", tokenSupply, 18);
        usdc.transfer(investor, initialCapital);
        tokens.push(address(usdc));
        decimals.push(18);

        usdt = new MockToken("USDT", tokenSupply, 18);
        usdt.transfer(investor, initialCapital);
        tokens.push(address(usdt));
        decimals.push(18);

        busd = new MockToken("BUSD", tokenSupply, 18);
        busd.transfer(investor, initialCapital);
        tokens.push(address(busd));
        decimals.push(18);

        dai = new MockToken("DAI", tokenSupply, 18);
        dai.transfer(investor, initialCapital);
        tokens.push(address(dai));
        decimals.push(18);

        xusd = new MockToken("xUSD", tokenSupply, 6);
        xusd.transfer(investor, initialCapital);
        tokens.push(address(xusd));
        decimals.push(6);
        vm.stopPrank();
    }

    function setUp() public virtual {
        Utils utils = new Utils();
        users = utils.createUsers(3);

        createMockUsers(users);
        createMockToken();

        vm.startPrank(deployer);
        cow = new COW();

        // TODO: create a setup for test
        // - COW PROXY
        // - deploy DIAMOND
        // - add COMMODITY in DIAMOND
        // - add COMMODITY_V2 in DIAMOND
        // - add FUTURE in DIAMOND


        ////////////////////////////////////////////////////////////////////////
        ////// EXEMPLES EXEMPLES EXEMPLES EXEMPLES EXEMPLES EXEMPLES EXEMPLES
        ////////////////////////////////////////////////////////////////////////


        // ----------------
        // DIAMOND CONTRACT
        // ----------------
        diamond = new Diamond(controller);

        // ---------------------------
        // COMMODITY V1 CONTRACT FACET
        // ---------------------------
        bytes4[] memory selectors = new bytes4[](5);
        selectors[0] = commodity.createFuture.selector;
        selectors[1] = commodity.mintToken.selector;
        selectors[2] = commodity.buyOrder.selector;
        selectors[3] = commodity.sellOrder.selector;
        selectors[4] = commodity.cancelOrder.selector;

        commodity = new Commodity(
            tokens,
            decimals,
            _135days_in_blocks_to_unlock,
            kgSupply,
            kgPrice,
            kgPrice,
            status,
            controller,
            address(cow)
        );

        cow.setDao(address(commodity));

        Facet memory commodityFacet = Facet({facetAddress: address(commodity), action: Action.Save, fnSelectors: selectors});
        diamondCut.push(commodityFacet);


        diamond.diamondCut(diamondCut, address(0), new bytes(0));

        vm.stopPrank();
    }
}
