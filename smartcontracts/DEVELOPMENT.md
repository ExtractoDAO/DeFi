## How to start

You need before [foundry](https://book.getfoundry.sh)

```
curl -L https://foundry.paradigm.xyz | bash
```

### Buid yours contracts

```shell
forge b
```

### Run the tests

```
forge t
```

## Deploy Locally

Run your Anvil

```
anvil
```

Deploy your contracts

```
forge script scripts/deploy.e2e.sol:DeployE2E -f http://localhost:8545 --broadcast
```

### The script `deploy.e2e.sol` will deploy:

- 1 DAO: with this contract you can create new Extracto@ contracts
- 1 ERC20: fake USDT for tests
- 1 ERC20: fake BUSD for tests
- 1 ERC20: fake USDC for tests
- 1 ERC20: fake DAI for tests
- All This tokens are enable in DAO for buy new Extracto@ contracts