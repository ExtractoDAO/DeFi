from typing import Optional
import strawberry

from chain_vission.use_cases.graphql.pagination import PaginationWindow, get_pagination_window
from chain_vission.domain.investor import Investor, get_all_investors
from chain_vission.domain.contract import (
    Contract,
    get_all_contracts,
    get_all_contracts_by_investor,
    get_contract_by_address,
)
from chain_vission.domain.order import (
    Order,
    get_all_orders,
    get_all_ordes_by_investor,
    get_order_by_hash,
)
from chain_vission.domain.price import (
    Price,
    get_all_buy_price,
    get_all_sell_price,
)


@strawberry.type
class Query:
    @strawberry.field
    def all_buy_prices(self, total: int = 100, at: int = 0) -> PaginationWindow[Price]:
        return get_pagination_window(dataset=get_all_buy_price(), total=total, at=at)

    @strawberry.field
    def all_sell_prices(self, total: int = 100, at: int = 0) -> PaginationWindow[Price]:
        return get_pagination_window(dataset=get_all_sell_price(), total=total, at=at)

    @strawberry.field
    def all_investors(self, total: int = 100, at: int = 0) -> PaginationWindow[Investor]:
        return get_pagination_window(dataset=get_all_investors(), total=total, at=at)

    @strawberry.field
    def all_contracts(self, total: int = 100, at: int = 0) -> PaginationWindow[Contract]:
        return get_pagination_window(dataset=get_all_contracts(), total=total, at=at)

    @strawberry.field
    def contract_by_address(self, address: str) -> Optional[Contract]:
        return get_contract_by_address(address)

    @strawberry.field
    def contracts_by_investor(
        self, investor: str, total: int = 100, at: int = 0
    ) -> Optional[PaginationWindow[Contract]]:
        return get_pagination_window(
            dataset=get_all_contracts_by_investor(investor), total=total, at=at
        )

    @strawberry.field
    def all_orders(self, total: int = 100, at: int = 0) -> PaginationWindow[Order]:
        return get_pagination_window(dataset=get_all_orders(), total=total, at=at)

    @strawberry.field
    def order_by_hash(self, tx_hash: str) -> Optional[Order]:
        return get_order_by_hash(tx_hash)

    @strawberry.field
    def order_by_investor(
        self, investor: str, total: int = 100, at: int = 0
    ) -> Optional[PaginationWindow[Order]]:
        return get_pagination_window(
            dataset=get_all_ordes_by_investor(investor), total=total, at=at
        )
