from pymongo import MongoClient
from chain_vission.logger.logs import CustomLogger
from chain_vission.utils.environment import Environment


class MongoDBConnectionError(Exception):
    def __init__(self, message: str) -> None:
        super().__init__(f"Failed to connect to MongoDB: {message}")


class MongoAdapter:
    _instance = None

    @staticmethod
    def getInstance(env: Environment):
        """Static access method."""
        if MongoAdapter._instance is None:
            MongoAdapter(env)
        return MongoAdapter._instance

    def __init__(self, env: Environment, logger: CustomLogger):
        """Virtually private constructor."""
        if MongoAdapter._instance is not None:
            raise Exception("This class should be a singleton!")
        else:
            MongoAdapter._instance = self
            # To avoid the variable env loaded when in mock tests
            if __name__ != "__main__":
                self._connect(env)
            self.logger = logger
            self.test_connection()

    def _connect(self, env: Environment):
        """Establish a connection to the MongoDB server."""
        connection_string = f"mongodb://rwuser:{env.PASSWORD}@{env.MONGO_IP_PORT}/{env.ENV}?authSource=admin&replicaSet=replica"
        self.client = MongoClient(connection_string, connectTimeoutMS=5000)
        self.db = self.client[env.ENV]

    def get_data(self, collection_name: str, query: dict = {}) -> dict:
        """Retrieve data from the specified collection."""
        collection = self.db[collection_name]
        return list(collection.find(query))

    def add_data(self, collection_name: str, data: dict):
        """Add data to the specified collection."""
        collection = self.db[collection_name]
        return collection.insert_one(data).inserted_id

    def set_data(self, collection_name: str, query: dict, new_data: dict):
        """Replace a single document in the collection."""
        collection = self.db[collection_name]
        return collection.replace_one(query, new_data)

    def update_data(self, collection_name: str, query: dict, update: dict):
        """Update data in the specified collection."""
        collection = self.db[collection_name]
        return collection.update_one(query, {"$set": update})

    def delete_data(self, collection_name: str, query: dict):
        """Delete data from the specified collection."""
        collection = self.db[collection_name]
        return collection.delete_one(query)

    def test_connection(self):
        try:
            self.client.server_info()
            self.logger.info("Connected successfully to MongoDB.")
            print("Connected successfully to MongoDB.")
        except Exception as message:
            self.logger.info("Failed to connect to MongoDB")
            print("Failed to connect to MongoDB")
            raise MongoDBConnectionError(message)
