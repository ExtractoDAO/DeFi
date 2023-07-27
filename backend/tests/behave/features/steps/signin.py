from eth_account.messages import encode_defunct
from behave import given, when, then
from eth_account import Account
from datetime import datetime
import pytest
from siwe import SiweMessage
from httpx import Response
import json


ADDRESS = "behavetests"
MUTATION = """
    mutation TestMutation($tx_id: String!, $address: String!, $commodityAmount: Float!, $locktime: Int!, $owner: String!, $price: Int!) {
        addContract(
            commodityAmount: $commodityAmount
            locktime: $locktime
            address: $address
            tx_id: $tx_id
            owner: $owner
            price: $price
        ) {
            message
            success
        }
    }
"""
QUERY = """
    query TestQuery($address: String!) {
        contractByAddress(address: $address) {
            commodityAmount
            locktime
            address
            status
            owner
            price
            tx_id
        }
    }
"""


def build_a_message(address: str, nonce: str) -> str:
    siwe_msg = SiweMessage(
        message={
            "domain": "localhost:8080",
            "address": address,
            "statement": "Test Extracto",
            "uri": "http://localhost:8080",
            "version": "1",
            "chain_id": 1,
            "nonce": nonce,
            "issued_at": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
        }
    )
    return siwe_msg.prepare_message()


def sign_a_message(message: str) -> str:
    account = Account.from_key(
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
    )

    msghash = encode_defunct(text=message)
    signature = account.sign_message(msghash)
    return signature.signature.hex()


def check_response(response: Response, error_message: str):
    assert (
        response.is_success
    ), f"ERROR in {error_message}\nLOG: {json.dumps(response.json())}"


def extract_nonce(response: Response):
    check_response(response, "extract_nonce")
    return response.json()["nonce"]


def extract_token(response: Response):
    check_response(response, "extract_token")
    return response.json()["token"]


@given('that the user is logged in "{address}"')
def that_the_user_is_logged_in(context, address: str):
    response: Response = context.client.get(f"/login/nonce/{address}")
    nonce = extract_nonce(response)

    message = build_a_message(address, nonce)
    signature = sign_a_message(message)
    response: Response = context.client.post(
        "/login/signin", json={"message": message, "signature": signature}
    )
    context.token = extract_token(response)


@when('user "{address}" buys a contract')
def user_buys_a_contract(context, address: str):
    context.new_contract = variables = {
        "tx_id": ADDRESS,
        "address": ADDRESS,
        "commodityAmount": 10.5,
        "locktime": 3600,
        "owner": address,
        "price": 101,
    }

    response = context.client.post(
        "/graphql",
        json={"query": MUTATION, "variables": variables},
        headers={"X-Authorization": context.token},
    )
    check_response(response, "user_buys_a_contract")
    assert {"data": {"addContract": {"message": "", "success": True}}} == response.json()


@then("the new contract should be available")
def the_new_contract_should_be_available(context):
    variables = {"address": ADDRESS}

    response = context.client.post(
        "/graphql", json={"query": QUERY, "variables": variables}
    )
    check_response(response, "the_new_contract_should_be_available")

    contract = response.json()["data"]["contractByAddress"]
    assert contract["address"] == context.new_contract["address"]
    assert not contract["burn"]
    assert contract["kg"] == context.new_contract["commodityAmount"]
    assert contract["locktime"] == context.new_contract["locktime"]
    assert contract["owner"] == context.new_contract["owner"]
    assert contract["price"] == context.new_contract["price"]


@then('the user "{address}" should log out')
def the_user_should_log_out(context, address: str):
    response: Response = context.client.get(
        f"/login/signout/{address}",
        headers={"X-Authorization": context.token},
    )
    check_response(response, "the_user_should_log_out")
