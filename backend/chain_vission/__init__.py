from chain_vission.middleware.authentication import get_authentication_token
from chain_vission.adapter.firebase import FirebaseAdapter
from fastapi import FastAPI
import os

adapter_app = FirebaseAdapter()
app = FastAPI(docs_url="/")
app.middleware("http")(get_authentication_token)


if os.getenv("ENV") == "devnet":
    from fastapi.middleware.cors import CORSMiddleware

    origins = [
        "http://localhost",
        "http://localhost:8080",
        "http://localhost:8000",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
