from chain_vission import adapter_app
from typing import List, Optional
from strawberry import type


@type
class Order:
    """
    type Contract {
        investor: Str!
        contract: Str!
        hash: Str!
        kg: Decimal!
    }
    """

    investor: str
    contract: str
    hash: str
    kg: float

    @staticmethod
    def from_dict(order: dict) -> Optional["Order"]:
        if order:
            return Order(
                investor=order["investor"],
                contract=order["contract"],
                hash=order["hash"],
                kg=order["kg"],
            )
        # TODO: improve this with logger module
        warn = (
            "WARN: Expected dict with: investor, contract, hash and kg, but got"
            f" {list(order.keys())}"
        )
        print(warn)
        return None


def get_all_orders() -> List[Order]:
    return list(
        map(
            Order.from_dict,
            adapter_app.get_data("/orders").values(),
        )
    )


def get_order_by_hash(tx_hash) -> Optional[Order]:
    orders = adapter_app.get_data("/orders")
    order = orders.get(tx_hash, {})
    return Order.from_dict(order)


def get_all_ordes_by_investor(investor) -> Optional[List[Order]]:
    return list(
        map(
            Order.from_dict,
            (
                filter(
                    lambda x: x["investor"] == investor,
                    adapter_app.get_data("/orders").values(),
                )
            ),
        )
    )
