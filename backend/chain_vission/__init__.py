from chain_vission.adapter.firebase import FirebaseAdapter
from fastapi import FastAPI

adapter_app = FirebaseAdapter()
app = FastAPI()
