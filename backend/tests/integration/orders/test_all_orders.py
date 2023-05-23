from chain_vission.adapter.firebase import FirebaseAdapter
from fastapi.testclient import TestClient
from order_data import raw_data, query
from chain_vission.main import app
from unittest.mock import patch
from fastapi import status
import unittest

from tests.integration.utils import generate_graphql_query


class TestDomain(unittest.TestCase):
    @patch.object(FirebaseAdapter, "get_data", return_value=raw_data)
    def test_get_all_orders(self, _mock):
        client = TestClient(app)
        all_orders = client.post(url="/graphql", json={"query": query})

        assert all_orders.status_code == status.HTTP_200_OK
        orders = all_orders.json()
        assert "data" in orders
        assert "allOrders" in orders["data"]
        assert "investor" in orders["data"]["allOrders"]["items"][0]
        assert "contract" in orders["data"]["allOrders"]["items"][0]
        assert "hash" in orders["data"]["allOrders"]["items"][0]
        assert "kg" in orders["data"]["allOrders"]["items"][0]
        assert len(orders["data"]["allOrders"]["items"]) == 1

    @patch.object(FirebaseAdapter, "get_data", return_value=raw_data)
    def test_get_pagination_investors(self, _mock):
        client = TestClient(app)
        fields = ["contract"]
        total = 1
        pagination_query = generate_graphql_query("allOrders", fields, total, 0)
        all_orders = client.post(url="/graphql", json={"query": pagination_query})

        assert all_orders.status_code == status.HTTP_200_OK
        orders = all_orders.json()
        print(orders)
        print(pagination_query)
        assert len(orders["data"]["allOrders"]["items"]) == total
