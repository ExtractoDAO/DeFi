from firebase_admin import credentials, db
from dotenv import load_dotenv
import firebase_admin
import os


class FirebaseAdapter:
    _instance = None

    @staticmethod
    def getInstance():
        """Static access method."""
        if FirebaseAdapter._instance is None:
            FirebaseAdapter()
        return FirebaseAdapter._instance

    def __init__(self):
        """Virtually private constructor."""
        if FirebaseAdapter._instance is not None:
            raise Exception("This class is a singleton!")
        else:
            FirebaseAdapter._instance = self
            # to avoid the var env loaded when in mock tests
            if __name__ != "__main__":
                load_dotenv(".env")
                service_account_json = FirebaseAdapter._get_service_account_json()
                base_url = os.getenv("BASE_URL")
                prefix = os.getenv("ENV")

                self.__prefix = prefix
                self.cred = credentials.Certificate(service_account_json)
                self.app = firebase_admin.initialize_app(
                    self.cred, {"databaseUrl": base_url}
                )
                self.base_url = base_url
                self._db = db

    @staticmethod
    def _get_service_account_json() -> dict:
        cert = {
            "type": os.getenv("TYPE"),
            "project_id": os.getenv("PROJECT_ID"),
            "private_key_id": os.getenv("PRIVATE_KEY_ID"),
            "private_key": os.getenv("PRIVATE_KEY"),
            "client_email": os.getenv("CLIENT_EMAIL"),
            "client_id": os.getenv("CLIENT_ID"),
            "auth_uri": os.getenv("AUTH_URI"),
            "token_uri": os.getenv("TOKEN_URI"),
            "auth_provider_x509_cert_url": os.getenv("AUTH_PROVIDER_X509_CERT_URL"),
            "client_x509_cert_url": os.getenv("CLIENT_X509_CERT_URL"),
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
