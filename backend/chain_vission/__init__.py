from chain_vission.middleware.authentication import get_authentication_token
from chain_vission.adapter.firebase import FirebaseAdapter
from dotenv import load_dotenv
from fastapi import FastAPI
import os

load_dotenv(".env")

adapter_app = FirebaseAdapter()
app = FastAPI(docs_url="/")
app.middleware("http")(get_authentication_token)

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
DOMAIN = os.getenv("DOMAIN")

if os.getenv("ENV") == "devnet":
    JWT_SECRET_KEY = "JWT_SECRET_KEY"
    DOMAIN = "localhost:8080"
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
