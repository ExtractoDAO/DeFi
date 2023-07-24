from fastapi.testclient import TestClient
from chain_vission.main import app
import unittest


def before_feature(context, feature):
    print(f"🚀 Start settings for `{feature.name}`")
    context.client = TestClient(app)
    context.test = unittest.TestCase()
    print("✅ Done for test!")


def after_feature(context, feature):
    print(f"\n🏁 finished `{feature.name}`")
