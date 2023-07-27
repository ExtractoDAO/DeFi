from chain_vission import adapter_app, logger
from typing import List, Optional
import strawberry


@strawberry.type
class Investor:
    """
    type Investor {
        address: Str!
    }
    """

    address: str

    @staticmethod
    def from_dict(investor: dict) -> Optional["Investor"]:
        if investor:
            return Investor(address=investor)

        message = f"Expected dict with: address, but got {list(investor.keys())}"
        logger.warn(message)
        return None


def get_all_investors() -> List[Investor]:
    return list(
        map(
            Investor.from_dict,
            adapter_app.get_data("/investors").values(),
        )
    )
