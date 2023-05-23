query = """
query {
    allContracts {
        items {
            burn
            locktime
            address
            kg
            owner
            price
        }
    }
}
"""

raw_data = {
    "0x0b32337D35f8CAB81180b031D9A244E088d0c926": {
        "address": "0x0b32337D35f8CAB81180b031D9A244E088d0c926",
        "burn": False,
        "kg": 2.58,
        "locktime": 44116771,
        "owner": "0xf9ee4348dc2cd6d42b2cd9b5c5927d4854b88284",
        "price": 1,
    },
    "0x2E74C7D6940d43131459d2d6B7975D4223b887Ea": {
        "address": "0x2E74C7D6940d43131459d2d6B7975D4223b887Ea",
        "burn": False,
        "kg": 6.46,
        "locktime": 44381021,
        "owner": "0x5b8881d1d5df945df6ec3752414cbb4c4f594556",
        "price": 1,
    },
    "0x362Bf8a35a16dC1032f57D50199Ad9A6108B9498": {
        "address": "0x362Bf8a35a16dC1032f57D50199Ad9A6108B9498",
        "burn": False,
        "kg": 20,
        "locktime": 44218372,
        "owner": "0xc4e40ad0d18a0c8fec48e6ced3b884111c0ee84c",
        "price": 1,
    },
    "0x3EFE0ba0F1a47F68170631991dDfa68512E47726": {
        "address": "0x3EFE0ba0F1a47F68170631991dDfa68512E47726",
        "burn": False,
        "kg": 2.58,
        "locktime": 44147611,
        "owner": "0x5b8881d1d5df945df6ec3752414cbb4c4f594556",
        "price": 1,
    },
    "0x44B8ce859f3cb27cfA20E93318308bba6D58E0e8": {
        "address": "0x44B8ce859f3cb27cfA20E93318308bba6D58E0e8",
        "burn": False,
        "kg": 2.58,
        "locktime": 44073257,
        "owner": "0x5b8881d1d5df945df6ec3752414cbb4c4f594556",
        "price": 1,
    },
    "0x472eD0cdA4a8E70793d02c222Af2C9648b061Df2": {
        "address": "0x472eD0cdA4a8E70793d02c222Af2C9648b061Df2",
        "burn": False,
        "kg": 4.13,
        "locktime": 44074242,
        "owner": "0x719c03dec577325fb499a06ba7ebead6cf2e4ca4",
        "price": 1,
    },
    "0x478d6009EB8103D5cd663395F2b4daf5A328001f": {
        "address": "0x478d6009EB8103D5cd663395F2b4daf5A328001f",
        "burn": False,
        "kg": 3.1,
        "locktime": 44073088,
        "owner": "0x5b8881d1d5df945df6ec3752414cbb4c4f594556",
        "price": 1,
    },
    "0x4AD1dD9D912eBEF1cD5A56Befff9365D97666Fd0": {
        "address": "0x4AD1dD9D912eBEF1cD5A56Befff9365D97666Fd0",
        "burn": False,
        "kg": 6.98,
        "locktime": 44543306,
        "owner": "0x5b8881d1d5df945df6ec3752414cbb4c4f594556",
        "price": 1,
    },
    "0x596cC826897C52d97829102241876d4AD68Ed6D6": {
        "address": "0x596cC826897C52d97829102241876d4AD68Ed6D6",
        "burn": False,
        "kg": 4.65,
        "locktime": 44073510,
        "owner": "0x719c03dec577325fb499a06ba7ebead6cf2e4ca4",
        "price": 1,
    },
    "0x62ed2369d4267ca1e96FD2e95843652f26EE9171": {
        "address": "0x62ed2369d4267ca1e96FD2e95843652f26EE9171",
        "burn": False,
        "kg": 10.34,
        "locktime": 44079181,
        "owner": "0x7ca3cd22b34f34f2a895866f7f8e64cc7ec5eb77",
        "price": 1,
    },
    "0x63747c1560CA9179C5841cB707bC6E06e958934a": {
        "address": "0x63747c1560CA9179C5841cB707bC6E06e958934a",
        "burn": False,
        "kg": 2.58,
        "locktime": 44472631,
        "owner": "0xf0862d81bd4c6ccc115536d19ac0f5e6b1b02d71",
        "price": 1,
    },
    "0x9648a8dc9b093987cD11992d144DEF77f5F6ab53": {
        "address": "0x9648a8dc9b093987cD11992d144DEF77f5F6ab53",
        "burn": False,
        "kg": 2.58,
        "locktime": 44143791,
        "owner": "0xa0e33c4bdf67a40638c715a208d9cf8b575da911",
        "price": 1,
    },
    "0xBa4eA874EC75D52387d6Ae50cA346c900A3d1CE2": {
        "address": "0xBa4eA874EC75D52387d6Ae50cA346c900A3d1CE2",
        "burn": False,
        "kg": 6.46,
        "locktime": 44147639,
        "owner": "0x5b8881d1d5df945df6ec3752414cbb4c4f594556",
        "price": 1,
    },
    "0xD0104ba3522017956C65c6f0Db0F660584DAc09E": {
        "address": "0xD0104ba3522017956C65c6f0Db0F660584DAc09E",
        "burn": False,
        "kg": 7.75,
        "locktime": 44073012,
        "owner": "0x5b8881d1d5df945df6ec3752414cbb4c4f594556",
        "price": 1,
    },
    "0xFe7aC0105eA1f6df53bf7fc24bf720B66f7c8215": {
        "address": "0xFe7aC0105eA1f6df53bf7fc24bf720B66f7c8215",
        "burn": False,
        "kg": 2.58,
        "locktime": 44071762,
        "owner": "0x5b8881d1d5df945df6ec3752414cbb4c4f594556",
        "price": 1,
    },
    "0xa1eA531601d8A9F646138e47c22CFe6221f72432": {
        "address": "0xa1eA531601d8A9F646138e47c22CFe6221f72432",
        "burn": False,
        "kg": 5.17,
        "locktime": 44538441,
        "owner": "0x5b8881d1d5df945df6ec3752414cbb4c4f594556",
        "price": 1,
    },
    "0xb218dD6bd884445B552f214373cE5f5003139fBB": {
        "address": "0xb218dD6bd884445B552f214373cE5f5003139fBB",
        "burn": False,
        "kg": 3.62,
        "locktime": 43935923,
        "owner": "0x5b8881d1d5df945df6ec3752414cbb4c4f594556",
        "price": 1,
    },
    "0xb41499355C4dB6164A17C08cf2ff4a3930C45Cb8": {
        "address": "0xb41499355C4dB6164A17C08cf2ff4a3930C45Cb8",
        "burn": False,
        "kg": 5.17,
        "locktime": 44073366,
        "owner": "0x6e5cf3369ea7269b712b76218eef6442bf60ece9",
        "price": 1,
    },
}
