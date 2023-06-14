// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {CommodityFacet} from "../src/extracto/facet/commodity/v2/Commodity.Facet.sol";
import {Facet, Action} from "../src/extracto/diamond/interfaces/Types.sol";
import {Commodity} from "../src/extracto/facet/commodity/Commodity.sol";
import {Future} from "../src/extracto/facet/future/Future.sol";
import {Diamond} from "../src/extracto/diamond/Diamond.sol";
import {BaseSetup} from "./BaseSetup.t.sol";
import {MockToken} from "./MockToken.t.sol";
import {COW} from "../src/token/COW.sol";
import {Utils} from "./Utils.t.sol";
import {Helper} from "./Helper.t.sol";

contract BaseSetupV2 is Utils {
    uint256 locktime = 10;
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

    Diamond diamond;
    CommodityFacet commodityFacet;
    Future future;
    Future futureV1;
    Helper h;
    COW cow;
    Facet[] diamondCut;

    MockToken usdc;

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
    }

    function setUp() public virtual {
        Utils utils = new Utils();
        users = utils.createUsers(3);

        createMockUsers(users);
        createMockToken();

        vm.startPrank(deployer);

        cow = new COW();
        diamond = new Diamond();
        commodityFacet = new CommodityFacet();
        cow.setDao(address(diamond));

        bytes4[] memory selectors = new bytes4[](25);

        selectors[0] = commodityFacet.getTotalSupplyKG.selector;
        selectors[1] = commodityFacet.getYieldFarming.selector;
        selectors[2] = commodityFacet.getSellPrice.selector;
        selectors[3] = commodityFacet.getBuyPrice.selector;
        selectors[4] = commodityFacet.getLocktime.selector;
        selectors[5] = commodityFacet.getActivated.selector;
        selectors[6] = commodityFacet.getFullDrawer.selector;
        selectors[7] = commodityFacet.getContractsByInvestor.selector;
        selectors[8] = commodityFacet.getAllowedTokens.selector;
        selectors[9] = commodityFacet.getAllowedTokensLength.selector;
        selectors[10] = commodityFacet.getDao.selector;
        selectors[11] = commodityFacet.getController.selector;
        selectors[12] = commodityFacet.getCOW.selector;
        selectors[13] = commodityFacet.setController.selector;
        selectors[14] = commodityFacet.setDAO.selector;
        selectors[15] = commodityFacet.setCOW.selector;
        selectors[16] = commodityFacet.addTokens.selector;
        selectors[17] = commodityFacet.updateActive.selector;
        selectors[18] = commodityFacet.updateBuyPrice.selector;
        selectors[19] = commodityFacet.updateLockTime.selector;
        selectors[20] = commodityFacet.updateSellPrice.selector;
        selectors[21] = commodityFacet.updateYieldFarming.selector;
        selectors[22] = commodityFacet.delTokens.selector;
        selectors[23] = commodityFacet.init.selector;
        selectors[24] = commodityFacet.createFuture.selector;

        Facet memory commodityFacets =
            Facet({facetAddress: address(commodityFacet), action: Action.Save, fnSelectors: selectors});

        bytes memory init = abi.encodeWithSelector(
            bytes4(keccak256(bytes("init(address[],uint8[],uint256,uint256,uint256,uint256,bool,address,address)"))),
            tokens,
            decimals,
            locktime,
            kgSupply,
            kgPrice,
            kgPrice,
            status,
            controller,
            address(cow)
        );
        diamondCut.push(commodityFacets);
        diamond.diamondCut(diamondCut, address(commodityFacet), init);

        vm.stopPrank();

        h = new Helper(diamond);
    }
}
