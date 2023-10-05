from chain_vission import adapter_app, logger
from typing import List, Optional
import strawberry

from enum import Enum


@strawberry.enum
class OrderStatus(Enum):
    PENDING = 0
    CONFIRMED = 1
    CANCELED = 2


@strawberry.type
class Order:
    """
    type Contract {
        id: Str!
        investor: Str
        future: Str!
        amount: Decimal!
        commodityAmount: Decimal!
        way: Str!
        status: Int
    }
    """

    id: str
    investor: str
    future: str
    amount: float
    commodityAmount: float
    way: str # sell | buy
    status: OrderStatus

    @staticmethod
    def from_dict(order: dict) -> Optional["Order"]:
        if order:
            return Order(
                id=order["id"],
                investor=order["investor"],
                future=order["future"],
                amount=order["amount"],
                commodityAmount=order["commodityAmount"],
                way=order["way"],
                status=OrderStatus(order["status"]).value
            )

        message = f"Expected dict with: investor, future, amount and commodityAmount, but got {list(order.keys())}"
        logger.warn(message)
        return None

    @property
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "investor": self.investor,
            "future": self.future,
            "amount": self.amount,
            "commodityAmount": self.commodityAmount,
            "way": self.way,
            "status": self.status
        }


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


def get_all_orders_by_investor(investor) -> Optional[List[Order]]:
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
