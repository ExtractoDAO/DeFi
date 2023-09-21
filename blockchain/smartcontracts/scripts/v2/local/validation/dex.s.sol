// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "../../../../lib/forge-std/src/Script.sol";
import {Commodity} from "../../../../src/extracto/facet/commodity/Commodity.sol";
import {Diamond} from "../../../../src/extracto/diamond/Diamond.sol";
import {MockToken} from "../../../../test/MockToken.t.sol";

abstract contract Data is Script {
    bytes32 controllerPrivateKey =
        hex"ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    bytes32 guessPrivatekey =
        hex"59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
    address diamond = 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9;

    Commodity commodity = Commodity(diamond);
    MockToken usdc = MockToken(0x5FbDB2315678afecb367f032d93F642f64180aa3);

    function bytes2uint(bytes32 b) public pure returns (uint256 result) {
        result = uint256(b);
    }

    constructor() {}
}

abstract contract Helper is Data {
    bytes payload;
    bytes4 fn;

    constructor() Data() {}

    function diamondApprove(uint256 allowance) public {
        usdc.approve(address(diamond), allowance);
    }

    function buyNewContract(uint256 allowance) public returns (address) {
        fn = bytes4(keccak256(bytes("createFuture(address,uint256)")));
        payload = abi.encodeWithSelector(fn, address(usdc), allowance);

        (bool ok, bytes memory data) = address(diamond).call(payload);
        if (!ok) {
            assembly {
                revert(add(data, 32), mload(data))
            }
        } else {
            (address future, ) = abi.decode(data, (address, uint256));
            return future;
        }
    }

    function sellOrder(address future, uint256 price) public {}

    function buyOrder(uint256 price, uint256 commodity) public {}

    function getOrderBook() public {}
}

contract Dex is Helper {
    constructor() Helper() {}

    function run() external {
        vm.startBroadcast(bytes2uint(controllerPrivateKey));

        // vender contrato
        sellOrder(0xd8058efe0198ae9dD7D563e1b4938Dcbc86A1F81, 1500 * 10e18);

        // transferir saldo de A->B
        transfer(1500 * 10e18, 0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
        vm.stopBroadcast();

        // colocar ordem de compra
        vm.startBroadcast(bytes2uint(guessPrivatekey));
        buyOrder(1500 * 10e18, 1);

        // ver se o orderbook esta empty
        getOrderBook();

        vm.stopBroadcast();
    }
}
