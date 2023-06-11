// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {CommodityFacetV2} from "../../../src/extracto/facet/commodity/facet/v2/Commodity.Facet.V2.sol";
import {Facet, Action} from "../../../src/extracto/diamond/interfaces/Types.sol";
import {DiamondBaseSetup} from "../DiamondBaseSetup.t.sol";

contract DiamondBaseSetupV2 is DiamondBaseSetup {
    CommodityFacetV2 commodityFacetV2;
    Facet[] diamondCutV2;

    function setUp() public virtual override {
        DiamondBaseSetup.setUp();

        vm.startPrank(deployer);
        commodityFacetV2 = new CommodityFacetV2();

        bytes4[] memory selectors = new bytes4[](1);

        selectors[0] = commodityFacetV2.mintToken.selector;

        Facet memory commodityFacets =
            Facet({facetAddress: address(commodityFacet), action: Action.Save, fnSelectors: selectors});

        diamondCutV2.push(commodityFacets);
        diamond.diamondCut(diamondCutV2, address(0), new bytes(0));

        vm.stopPrank();
    }
}
