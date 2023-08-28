from pymongo import MongoClient
from chain_vission.utils.environment import Environment

env = Environment()
client = MongoClient(f"mongodb://{env.MONGO_USER}:{env.MONGO_PASSWORD}@{env.MONGO_HOST}/test?authSource=admin&replicaSet=replica")

class MongoAdapter:
    db = client["devnet"]

    def get_data(self, collection) -> dict:
        ref = self.db[collection]
        return ref

    def find_data(self, collection, key, value) -> dict:
        ref = self.db[collection]
        return ref.find_one({ [key]: value })

    def add_data(self, collection, data):
        ref = self.db[collection]
        return ref.insert_one(data)

    def update_data(self, collection, id, data):
        ref = self[collection]
        return ref.update_one({ "_id": id }, { "$set": data })

    def delete_data(self, collection, id):
        ref = self[collection]
        return ref.delete_one({ "_id": id })
