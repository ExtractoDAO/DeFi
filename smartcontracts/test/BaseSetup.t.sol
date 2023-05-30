// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {Commodity} from "../src/extracto/facet/commodity/Commodity.sol";
import {COW} from "../src/token/COW.sol";
import {Future} from "../src/extracto/facet/future/Future.sol";
import {BaseSetup} from "./BaseSetup.t.sol";
import {MockToken} from "./MockToken.t.sol";
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

        // TODO: create a setup for test
        // - COW PROXY
        // - deploy DIAMOND
        // - add COMMODITY in DIAMOND
        // - add COMMODITY_V2 in DIAMOND
        // - add FUTURE in DIAMOND


        ////////////////////////////////////////////////////////////////////////
        ////// EXEMPLES EXEMPLES EXEMPLES EXEMPLES EXEMPLES EXEMPLES EXEMPLES
        ////////////////////////////////////////////////////////////////////////


        /////////////// ----------------
        /////////////// DIAMOND CONTRACT
        /////////////// ----------------
        /////////////// vm.prank(controller);
        /////////////// diamond = new Diamond(address(token));

        /////////////// ----------------
        /////////////// BANK CONTRACT FACET
        /////////////// ----------------
        /////////////// 0x520a19c0  =>  createEmployee(address,uint256)
        /////////////// 0x5e91d8ec  =>  updateEmployee(address,uint256)
        /////////////// 0x6e7c4ab1  =>  deleteEmployee(address)
        /////////////// 0xe3366fed  =>  getAllEmployees() -> address[] memory
        /////////////// 0x32648e09  =>  getEmployee(address) -> (address, uint256)
        /////////////// 0x809e9ef5  =>  payAllEmployees()
        /////////////// 0x12065fe0  =>  getBalance()
        /////////////// 0x1e153139  =>  getTotalEmployeeCost()
        /////////////// bytes4[] memory selectors = new bytes4[](8);
        /////////////// selectors[0] = Bank.createEmployee.selector;
        /////////////// selectors[1] = Bank.updateEmployee.selector;
        /////////////// selectors[2] = Bank.deleteEmployee.selector;
        /////////////// selectors[3] = Bank.getEmployee.selector;
        /////////////// selectors[4] = Bank.getAllEmployees.selector;
        /////////////// selectors[5] = Bank.payAllEmployees.selector;
        /////////////// selectors[6] = Bank.getBalance.selector;
        /////////////// selectors[7] = Bank.getTotalEmployeeCost.selector;
        /////////////// vm.prank(controller);
        /////////////// bank = new Bank();

        /////////////// Facet memory bankFacet = Facet({facetAddress: address(bank), action: Action.Save, fnSelectors: selectors});
        /////////////// diamondCut.push(bankFacet);

        /////////////// vm.prank(controller);
        /////////////// diamond.diamondCut(diamondCut, address(0), new bytes(0));


        /////////////// ----------------
        /////////////// BANK V2 CONTRACT FACET
        /////////////// ----------------
        /////////////// [Modify] 0x809e9ef5  =>  payAllEmployees()
        /////////////// [Save]   0x708f29a6  =>  getTotalPayments()

        /////////////// bytes4[] memory selectorsModify = new bytes4[](1);
        /////////////// selectorsModify[0] = BankV2.payAllEmployees.selector;

        /////////////// bytes4[] memory selectorsSave = new bytes4[](1);
        /////////////// selectorsSave[0] = BankV2.getTotalPayments.selector;

        /////////////// vm.prank(controller);
        /////////////// bankv2 = new BankV2();

        /////////////// bankV2FacetSave = Facet({facetAddress: address(bankv2), action: Action.Save, fnSelectors: selectorsSave});
        /////////////// bankV2FacetModity = Facet({facetAddress: address(bankv2), action: Action.Modify, fnSelectors: selectorsModify});
    

        vm.stopPrank();
    }
}
