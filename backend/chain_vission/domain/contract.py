from chain_vission import adapter_app
from typing import List, Optional
from enum import Enum
import strawberry


@strawberry.enum
class ContractStatus(Enum):
    PENDING = 0
    MINED = 1
    BURNED = 2


@strawberry.type
class Contract:
    """
    type Contract {
        tx_hash: Str!
        locktime: Int!
        address: Str!
        owner: Str!
        price: Int!
        status: Int!
        commodityAmmount: Decimal!
    }
    """

    commodity_amount: float
    status: ContractStatus
    locktime: int
    address: str
    owner: str
    price: int
    tx_id: str

    @staticmethod
    def from_dict(contract: dict) -> Optional["Contract"]:
        if contract:
            return Contract(
                status=ContractStatus(contract["status"]).value,
                commodity_amount=contract["commodityAmount"],
                locktime=contract["locktime"],
                address=contract["address"],
                tx_id=contract["address"],
                price=contract["price"],
                owner=contract["owner"],
            )

        # TODO: improve this with logger module
        warn = f"WARN: Expected dict with: locktime, address, owner, price, burn and kg, but got {list(contract.keys())}"
        print(warn)
        return None

    @property
    def to_dict(self) -> dict:
        return {
            "commodityAmount": self.commodity_amount,
            "status": self.status.value,
            "locktime": self.locktime,
            "address": self.address,
            "owner": self.owner,
            "price": self.price,
            "txId": self.tx_id,
        }


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
