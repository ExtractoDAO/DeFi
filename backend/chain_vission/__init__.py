from chain_vission.middleware.authentication import get_authentication_token
from chain_vission.adapter.firebase import FirebaseAdapter
from chain_vission.utils.environment import Environment
from chain_vission.logger.logs import CustomLogger
from fastapi import FastAPI

env = Environment()
logger = CustomLogger(env.LOG_PATH)
adapter_app = FirebaseAdapter(env)
app = FastAPI(
    title="Backend",
    version="0.4.0",
    redoc_url="/"
)
app.middleware("http")(get_authentication_token)


if env.ENV == "devnet":
    from fastapi.middleware.cors import CORSMiddleware

    env.JWT_SECRET_KEY = "JWT_SECRET_KEY"
    env.DOMAIN = "localhost:8080"
    logger = CustomLogger(env.LOG_PATH, True)

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
