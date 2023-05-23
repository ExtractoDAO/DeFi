from chain_vission.adapter.firebase import FirebaseAdapter
import unittest


def before_feature(context, feature):
    print(f"🚀 Start settings for {feature}...")
    context.aq = feature.tags
    context.adapter = FirebaseAdapter()
    context.test = unittest.TestCase()
    print("✅ Done for test!")


def after_feature(context, feature):
    print(f"🏁 finished {feature}")
