from chain_vission import adapter_app
from typing import List, Optional
from strawberry import type


@type
class Contract:
    """
    type Contract {
        locktime: Int!
        address: Str!
        owner: Str!
        price: Int!
        burn: Bool!
        kg: Decimal!
    }
    """

    locktime: int
    address: str
    owner: str
    price: int
    burn: bool
    kg: float

    @staticmethod
    def from_dict(contract: dict) -> Optional["Contract"]:
        if contract:
            return Contract(
                locktime=contract["locktime"],
                address=contract["address"],
                price=contract["price"],
                owner=contract["owner"],
                burn=contract["burn"],
                kg=contract["kg"],
            )

        # TODO: improve this with logger module
        warn = (
            "WARN: Expected dict with: locktime, address, owner, price, burn and kg, but"
            f" got {list(contract.keys())}"
        )
        print(warn)
        return None
    


def get_all_contracts() -> List[Contract]:
    return list(
        map(
            Contract.from_dict,
            adapter_app.get_data("/contracts").values(),
        )
    )


def get_contract_by_address(address) -> Contract:
    contracts = adapter_app.get_data("/contracts")
    contract = contracts.get(address, {})
    return Contract.from_dict(contract)


def get_all_contracts_by_investor(investor) -> Optional[List[Contract]]:
    return list(
        map(
            Contract.from_dict,
            (
                filter(
                    lambda x: x["owner"] == investor,
                    adapter_app.get_data("/contracts").values(),
                )
            ),
        )
    )
