from chain_vission import adapter_app
from typing import List, Optional
from strawberry import type


@type
class Price:
    """
    type Price {
        timestamp: Int!
        value: Decimals!
    }
    """

    timestamp: int
    value: float

    @staticmethod
    def from_tuple(price) -> Optional["Price"]:
        if price:
            timestamp, value = price[0], price[1]
            return Price(
                timestamp=int(timestamp),
                value=float(value),
            )
        # TODO: improve this with logger module
        warn = (
            f"WARN: Expected dict with: timestamp and value, but got {list(price.keys())}"
        )
        print(warn)
        return None


def get_all_buy_price() -> List[Price]:
    return list(
        map(
            Price.from_tuple,
            adapter_app.get_data("/price/buy").items(),
        )
    )


def get_all_sell_price() -> List[Price]:
    return list(
        map(
            Price.from_tuple,
            adapter_app.get_data("/price/sell").items(),
        )
    )
