from chain_vission.middleware.authentication import get_authentication_token
from chain_vission.adapter.firebase import FirebaseAdapter
from chain_vission.logger.logs import CustomLogger
from dotenv import load_dotenv
from fastapi import FastAPI
import os

load_dotenv(".env")

logger = CustomLogger("logging.log")
adapter_app = FirebaseAdapter()
app = FastAPI(docs_url="/", version"0.4.0")
app.middleware("http")(get_authentication_token)

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
DOMAIN = os.getenv("DOMAIN")

if os.getenv("ENV") == "devnet":
    from fastapi.middleware.cors import CORSMiddleware

    JWT_SECRET_KEY = "JWT_SECRET_KEY"
    DOMAIN = "localhost:8080"
    logger = CustomLogger("logging.log", True)

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
