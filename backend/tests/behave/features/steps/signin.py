import datetime
import json
from eth_account.messages import encode_defunct
from behave import given, when, then
from behave.runner import Context
from eth_account import Account
from siwe import SiweMessage
from enum import Enum


def build_a_message(address: str, nonce: str) -> str:
    siwe_msg = SiweMessage(
        message={
            "domain": "localhost:8000",
            "address": address,
            "statement": "Test Extracto",
            "uri": "http://localhost:8000",
            "version": "1",
            "chain_id": 1,
            "nonce": nonce,
            "issued_at": datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
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


@given('that the user is logged in "{address}"')
def that_the_user_is_logged_in(context: Context, address: str):
    nonce = context.client.get("/login/nonce/{address}").json()["nonce"]
    message = build_a_message(address, nonce)
    signature = sign_a_message(message)
    response = context.client.post(
        "/login/signin", json={"message": message, "signature": signature}
    ).json()
    print(response)
    context.token = response["token"]


@when("user buy a contract")
def user_buys_a_contract(context):
    raise NotImplementedError("STEP: When user buys a contract")


@then("the new contract should be available")
def the_new_contract_should_be_available(context):
    raise NotImplementedError("STEP: Then the new contract should be available")
