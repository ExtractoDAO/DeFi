from chain_vission.graphql.pagination import PaginationWindow, get_pagination_window
from chain_vission.graphql.domain.investor import Investor, get_all_investors
from strawberry import mutation, field, Schema
from chain_vission import adapter_app
from strawberry.types import Info
from jose import jwt, JWTError
from typing import Optional
import strawberry


from chain_vission.graphql.domain.price import (
    Price,
    get_all_buy_price,
    get_all_sell_price,
)
from chain_vission.graphql.domain.contract import (
    Contract,
    get_all_contracts,
    get_all_contracts_by_investor,
    get_contract_by_address,
)
from chain_vission.graphql.domain.order import (
    Order,
    get_all_orders,
    get_all_ordes_by_investor,
    get_order_by_hash,
)


@strawberry.type
class Query:
    @field
    def all_buy_prices(self, total: int = 100, at: int = 0) -> PaginationWindow[Price]:
        return get_pagination_window(dataset=get_all_buy_price(), total=total, at=at)

    @field
    def all_sell_prices(self, total: int = 100, at: int = 0) -> PaginationWindow[Price]:
        return get_pagination_window(dataset=get_all_sell_price(), total=total, at=at)

    @field
    def all_investors(self, total: int = 100, at: int = 0) -> PaginationWindow[Investor]:
        return get_pagination_window(dataset=get_all_investors(), total=total, at=at)

    @field
    def all_contracts(self, total: int = 100, at: int = 0) -> PaginationWindow[Contract]:
        return get_pagination_window(dataset=get_all_contracts(), total=total, at=at)

    @field
    def contract_by_address(self, address: str) -> Optional[Contract]:
        return get_contract_by_address(address)

    @field
    def contracts_by_investor(
        self, investor: str, total: int = 100, at: int = 0
    ) -> Optional[PaginationWindow[Contract]]:
        return get_pagination_window(
            dataset=get_all_contracts_by_investor(investor), total=total, at=at
        )

    @field
    def all_orders(self, total: int = 100, at: int = 0) -> PaginationWindow[Order]:
        return get_pagination_window(dataset=get_all_orders(), total=total, at=at)

    @field
    def order_by_hash(self, tx_hash: str) -> Optional[Order]:
        return get_order_by_hash(tx_hash)

    @field
    def order_by_investor(
        self, investor: str, total: int = 100, at: int = 0
    ) -> Optional[PaginationWindow[Order]]:
        return get_pagination_window(
            dataset=get_all_ordes_by_investor(investor), total=total, at=at
        )


SECRET_KEY = "secretkey"


@strawberry.type
class Response:
    success: bool = True
    message: str


def verify_token(token: str) -> Optional[str]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except JWTError as e:
        return f"Authentication attempt rejected: {e}"

    address = payload["address"]
    stored_token = adapter_app.get_data(f"/tokens/{address}")

    if stored_token is None or stored_token != token:
        return "Authentication attempt rejected: Invalid token"

    return None


@strawberry.type
class Mutation:
    @mutation
    def new_contract(
        self,
        address: str,
        commodity_amount: float,
        locktime: int,
        owner: str,
        price: int,
        info: Info,
    ) -> Response:
        token = info.context["request"].state.token
        if (message := verify_token(token)) is not None:
            return Response(message=message, success=False)

        contract = Contract(
            address=address,
            burn=False,
            kg=commodity_amount,
            locktime=locktime,
            owner=owner,
            price=price,
        )
        adapter_app.set_data(f"/contracts/{contract.address}", contract.__dict__)
        return Response()


schema = Schema(query=Query, mutation=Mutation)