from typing import List, Optional
import strawberry
from chain_vission import adapter_app


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

        # TODO: improve this with logger module
        warn = f"WARN: Expected dict with: address, but got {list(investor.keys())}"
        print(warn)
        return None


def get_all_investors() -> List[Investor]:
    return list(
        map(
            Investor.from_dict,
            adapter_app.get_data("/investors").values(),
        )
    )
