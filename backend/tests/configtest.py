import os
from unittest import mock
from pytest import fixture


@fixture(scope="session", autouse=True)
def mock_settings_env_vars():
    var_env = {
        "BASE_URL": "",
        "FIREBASE_JSON_PATH": "firebase.json",
        "ENV": "devnet",
    }
    with mock.patch.dict(os.environ, var_env):
        yield
