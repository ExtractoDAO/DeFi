from chain_vission.adapter.firebase import FirebaseAdapter
from fastapi.testclient import TestClient
from price_data import raw_data_buy, raw_data_sell, query_buy, query_sell
from chain_vission.main import app
from unittest.mock import patch
from fastapi import status
import unittest

from tests.integration.utils import generate_graphql_query


class TestDomain(unittest.TestCase):
    def setUp(self) -> None:
        self.client = TestClient(app)

    @patch.object(FirebaseAdapter, "get_data", return_value=raw_data_buy)
    def test_get_all_buy_prices(self, _mock):
        all_buy_prices = self.client.post(url="/graphql", json={"query": query_buy})

        assert all_buy_prices.status_code == status.HTTP_200_OK
        buy_prices = all_buy_prices.json()
        assert "data" in buy_prices
        assert "allBuyPrices" in buy_prices["data"]
        assert "timestamp" in buy_prices["data"]["allBuyPrices"]["items"][0]
        assert "value" in buy_prices["data"]["allBuyPrices"]["items"][0]
        assert len(buy_prices["data"]["allBuyPrices"]["items"]) == 1

    @patch.object(FirebaseAdapter, "get_data", return_value=raw_data_sell)
    def test_get_all_sell_prices(self, _mock):
        all_sell_prices = self.client.post(url="/graphql", json={"query": query_sell})

        assert all_sell_prices.status_code == status.HTTP_200_OK
        sell_prices = all_sell_prices.json()
        assert "data" in sell_prices
        assert "allSellPrices" in sell_prices["data"]
        assert "timestamp" in sell_prices["data"]["allSellPrices"]["items"][0]
        assert "value" in sell_prices["data"]["allSellPrices"]["items"][0]
        assert len(sell_prices["data"]["allSellPrices"]["items"]) == 1

    @patch.object(FirebaseAdapter, "get_data", return_value=raw_data_sell)
    def test_get_pagination_prices(self, _mock):
        fields = ["value"]
        total = 1
        pagination_query = generate_graphql_query("allSellPrices", fields, total, 0)
        all_sell_prices = self.client.post(
            url="/graphql", json={"query": pagination_query}
        )

        assert all_sell_prices.status_code == status.HTTP_200_OK
        sell_prices = all_sell_prices.json()
        assert len(sell_prices["data"]["allSellPrices"]["items"]) == total
