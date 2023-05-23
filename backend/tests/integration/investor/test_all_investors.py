from chain_vission.adapter.firebase import FirebaseAdapter
from fastapi.testclient import TestClient
from investor_data import raw_data, query
from chain_vission.main import app
from unittest.mock import patch
from fastapi import status
import unittest

from tests.integration.utils import generate_graphql_query


class TestDomain(unittest.TestCase):
    @patch.object(FirebaseAdapter, "get_data", return_value=raw_data)
    def test_get_all_investors(self, _mock):
        client = TestClient(app)
        all_investors = client.post(url="/graphql", json={"query": query})

        assert all_investors.status_code == status.HTTP_200_OK
        investors = all_investors.json()
        assert "data" in investors
        assert "allInvestors" in investors["data"]
        assert "address" in investors["data"]["allInvestors"]["items"][0]
        assert len(investors["data"]["allInvestors"]["items"]) == 18

    @patch.object(FirebaseAdapter, "get_data", return_value=raw_data)
    def test_get_pagination_investors(self, _mock):
        client = TestClient(app)
        fields = ["address"]
        total = 5
        pagination_query = generate_graphql_query("allInvestors", fields, total, 0)
        all_investors = client.post(url="/graphql", json={"query": pagination_query})

        assert all_investors.status_code == status.HTTP_200_OK
        investors = all_investors.json()
        assert len(investors["data"]["allInvestors"]["items"]) == total
