query = """
query {
    allOrders {
        items {
            contract
            hash
            investor
            kg
        }
    }
}
"""


raw_data = {
    "0x42bce2258ab1ebe311d4a8af4ae58e304d1c5f0951d331cc6e3ce6f68501036c": {
        "contract": "0x63747c1560CA9179C5841cB707bC6E06e958934a",
        "hash": "0x42bce2258ab1ebe311d4a8af4ae58e304d1c5f0951d331cc6e3ce6f68501036c",
        "investor": "0xf0862d81bd4c6ccc115536d19ac0f5e6b1b02d71",
        "kg": 3.87,
    }
}
