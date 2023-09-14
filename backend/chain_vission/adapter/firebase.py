from chain_vission.utils.environment import Environment
from chain_vission.logger.logs import CustomLogger
from firebase_admin import credentials, db
import firebase_admin


class FirebaseConnectionError(Exception):
    def __init__(self, message: str) -> None:
        super().__init__(f"Failed to connect to Firebase: {message}")


class FirebaseAdapter:
    _instance = None

    @staticmethod
    def getInstance(env: Environment, logger: CustomLogger):
        """Static access method."""
        if FirebaseAdapter._instance is None:
            FirebaseAdapter(env, logger)
        return FirebaseAdapter._instance

    def __init__(self, env: Environment, logger: CustomLogger):
        """Virtually private constructor."""
        if FirebaseAdapter._instance is not None:
            raise Exception("This class should be a singleton!")
        else:
            FirebaseAdapter._instance = self
            # to avoid the var env loaded when in mock tests
            if __name__ != "__main__":
                service_account_json = FirebaseAdapter._get_service_account_json(env)
                self.cred = credentials.Certificate(service_account_json)
                self.base_url = env.BASE_URL
                self.__prefix = env.ENV
                self.logger = logger
                self._db = db
                self.app = firebase_admin.initialize_app(
                    self.cred, {"databaseUrl": self.base_url}
                )

                self.test_connection()

    @staticmethod
    def _get_service_account_json(env: Environment) -> dict:
        cert = {
            "auth_provider_x509_cert_url": env.AUTH_PROVIDER_X509_CERT_URL,
            "client_x509_cert_url": env.CLIENT_X509_CERT_URL,
            "private_key_id": env.PRIVATE_KEY_ID,
            "client_email": env.CLIENT_EMAIL,
            "private_key": env.PRIVATE_KEY,
            "project_id": env.PROJECT_ID,
            "client_id": env.CLIENT_ID,
            "token_uri": env.TOKEN_URI,
            "auth_uri": env.AUTH_URI,
            "type": env.TYPE,
        }
        if all(cert.values()) is False:
            raise ValueError(f"You need a complete list of certificates: {cert}")
        return cert

    def _set_prefix(self, new_prefix):
        self.__prefix = new_prefix

    def _get_reference(self, route):
        uri = f"{self.__prefix}/{route}"
        return self._db.reference(uri, self.app, self.base_url)

    def get_data(self, route) -> dict:
        ref = self._get_reference(route)
        return ref.get()

    def add_data(self, route, data):
        ref = self._get_reference(route)
        ref.push(data)

    def set_data(self, route, data):
        ref = self._get_reference(route)
        ref.set(data)

    def update_data(self, route, data):
        ref = self._get_reference(route)
        ref.update(data)

    def delete_data(self, route):
        ref = self._get_reference(route)
        ref.delete()

    def test_connection(self):
        try:
            # Get the root node or some specific node that you know always exists.
            # If this node doesn't exist, replace '' with a node that does.
            ref = self._get_reference(self.__prefix)
            ref.get()
            self.logger.info("Connected successfully to Firebase.")
            print("Connected successfully to Firebase.")
        except Exception as message:
            self.logger.info("Failed to connect to Firebase")
            print("Failed to connect to Firebase")
            raise FirebaseConnectionError(message) from message
