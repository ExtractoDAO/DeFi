from tests.integration.utils import generate_graphql_query
from chain_vission.adapter.firebase import FirebaseAdapter
from contract_data import raw_data, query
from fastapi.testclient import TestClient
from chain_vission.main import app
from unittest.mock import patch
from fastapi import status
import unittest


class TestDomain(unittest.TestCase):
    @patch.object(FirebaseAdapter, "get_data", return_value=raw_data)
    def test_get_all_contracts(self, _mock):
        client = TestClient(app)
        all_contracts = client.post(url="/graphql", json={"query": query})

        assert all_contracts.status_code == status.HTTP_200_OK
        contracts = all_contracts.json()
        assert "data" in contracts
        assert "allContracts" in contracts["data"]
        assert "locktime" in contracts["data"]["allContracts"]["items"][0]
        assert "address" in contracts["data"]["allContracts"]["items"][0]
        assert "owner" in contracts["data"]["allContracts"]["items"][0]
        assert "price" in contracts["data"]["allContracts"]["items"][0]
        assert "burn" in contracts["data"]["allContracts"]["items"][0]
        assert "kg" in contracts["data"]["allContracts"]["items"][0]
        assert len(contracts["data"]["allContracts"]["items"]) == 18

    @patch.object(FirebaseAdapter, "get_data", return_value=raw_data)
    def test_get_pagination_contracts(self, _mock):
        client = TestClient(app)
        fields = ["address"]
        total = 7
        pagination_query = generate_graphql_query("allContracts", fields, total, 0)
        all_contracts = client.post(url="/graphql", json={"query": pagination_query})

        assert all_contracts.status_code == status.HTTP_200_OK
        contracts = all_contracts.json()
        assert len(contracts["data"]["allContracts"]["items"]) == total
