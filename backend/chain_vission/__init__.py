from fastapi import FastAPI
from chain_vission.adapter.firebase import FirebaseAdapter

adapter_app = FirebaseAdapter()
app = FastAPI()
