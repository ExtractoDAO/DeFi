from chain_vission.graphql.domain.price import Price, get_all_buy_price, get_all_sell_price
from chain_vission.graphql.pagination import PaginationWindow, get_pagination_window
from chain_vission.graphql.domain.investor import Investor, get_all_investors
from strawberry import type, field, Schema
from typing import Optional
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


@type
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


schema = Schema(query=Query)
