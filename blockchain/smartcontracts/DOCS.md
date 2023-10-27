## Crate new Futures contract

```mermaid
sequenceDiagram

actor Alice
participant ERC20
participant Commodity


Alice->>ERC20: approve(Commodity, 100USD)
Alice->>Commodity: createFuture(ERC20, 100USD)
create participant Future
Commodity->>Future: deploy(owner: Alice, commodityAmount: 100/price, locktime: 500blocks)
Commodity->>Alice: (Future, 100/price)
```

---

## Withdraw Futures

```mermaid
sequenceDiagram

actor Alice
participant Future
participant Commodity
participant COW-ERC20

Alice->>Future: withdraw()
Future->>Future: validate: if burned
Future->>Future: validate: if Alice is owner
Future->>Future: validate: if locktime passed
Future->>Future: validate: if exist some sell order
Future->>Future: state = burned

Future->>Commodity: mintToken(commodityAmount, Alice)
Commodity->>Commodity: contracts[Future] = burned
Commodity->>COW-ERC20: pay(Alice, commodityAmount)
COW-ERC20->>Alice: mint(Alice, commodityAmount)
```

---

## Sell Future order

```mermaid
sequenceDiagram

actor Alice
participant Future
participant DEX
participant Commodity
participant COW-ERC20

Alice->>Future: sellOrder(price)

Future->>Future: validate: if burned
Future->>Future: validate: if pass locktime
Future->>DEX: sellOrder(Alice, price)

DEX->>DEX: validate: if Alice is owner
DEX->>DEX: validate: if Future is unlisted

DEX->>Future: bytes32
Future->>Future: orderId = bytes32

Alice->>Future: withdraw()
Future->>DEX: cancelOrder(orderId)

DEX->>DEX: validate: if order exist
DEX->>DEX: validate: if Alice is owner of order
DEX->>DEX: removeOrder(orderId)


Future->>Commodity: mintToken(commodityAmount, Alice)
Commodity->>Commodity: contracts[Future] = burned
Commodity->>COW-ERC20: pay(Alice, commodityAmount)
COW-ERC20->>Alice: mint(Alice, commodityAmount)
```

## Buy order

## Match Orders

## Put order type of Commodities

## Wrapper COW
