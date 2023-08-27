from pydantic import BaseModel, validator
from dotenv import load_dotenv
import os


class MissingEnvironmentVarError(Exception):
    def __init__(self, name: str) -> None:
        super().__init__(f"Env var: '{name}' not found!\nAPPLICATION NEED THIS FOR START")


class Environment(BaseModel):
    AUTH_PROVIDER_X509_CERT_URL: str
    CLIENT_X509_CERT_URL: str
    PRIVATE_KEY_ID: str
    CLIENT_EMAIL: str
    PRIVATE_KEY: str
    PROJECT_ID: str
    TOKEN_URI: str
    CLIENT_ID: str
    BASE_URL: str
    AUTH_URI: str
    TYPE: str

    JWT_SECRET_KEY: str
    SIWE_STATEMENT: str
    SIWE_VERSION: int
    CHAIN_ID: int
    LOG_FILE: str
    DOMAIN: str
    ENV: str

    @validator("*", pre=True)
    def check_none(cls, value, field):
        if value is None:
            raise MissingEnvironmentVarError(field.name)
        return value

    def __init__(self, **data):
        load_dotenv()

        for field in self.__annotations__:
            data[field] = os.getenv(field)
        super().__init__(**data)
