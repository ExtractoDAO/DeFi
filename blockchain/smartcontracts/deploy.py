"""
Automation for update debug section in front-end
"""
from dataclasses import dataclass, field
from json import dumps, load
from typing import List

@dataclass
class Contract:
    """
        # Contract must have:
        - contractAddress: str
        - contractName: str
        - abi: list
    """
    name: str
    address: str
    abi: list = field(default_factory=list)


CONTRACT_SCRIPT_NAME = "deploy.e2e.s.sol"
TARGET_DIR = "../ui/generated/deployedContracts.ts"
CHAIN_ID = 31337
TRANSACTIONS_PATH = f"./broadcast/{CONTRACT_SCRIPT_NAME}/{CHAIN_ID}/run-latest.json"

def abi_path(name) -> str:
    if(name == "MockToken"):
        return f"artifacts/{name}.t.sol/{name}.json"
    else:
        return f"artifacts/{name}.sol/{name}.json"

with open(TRANSACTIONS_PATH) as deployed_contracts:
    json_file = load(deployed_contracts)
    transactions = json_file["transactions"]


    contracts: List[Contract] = [
        Contract(contract["contractName"], contract["contractAddress"])
        for contract in transactions
        if contract["transactionType"] == "CREATE"
    ]

contracts.append(Contract("Future", "0x61c36a8d610163660E21a8b7359e1Cac0C9133e1", []))

for contract in contracts:
    with open(abi_path(contract.name)) as full_abi_json:
        contract.abi = load(full_abi_json)["abi"]


json_config = {
    CHAIN_ID: [
        {
            "name": "localhost",
            "chainId": str(CHAIN_ID),
            "contracts": {}
        }
    ]
}


for contract in contracts:
    json_config[CHAIN_ID][0]["contracts"][contract.name] = {
        "address": contract.address,
        "abi": contract.abi
    }


typescript_content = f"const deployedContracts = {dumps(json_config)} as const; \n\n export default deployedContracts"


with open(TARGET_DIR, "w") as ts_file:
    ts_file.write(typescript_content)