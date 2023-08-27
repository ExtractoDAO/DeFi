from chain_vission.middleware.authentication import get_authentication_token
from chain_vission.adapter.firebase import FirebaseAdapter
from chain_vission.utils.environment import Environment
from chain_vission.logger.logs import CustomLogger
from fastapi import FastAPI

tags_metadata = [
    {
        "name": "Login",
        "description": """
- **Step 1**: First, you need to pass your address to get the nonce (`/nonce/{address}`).
- **Step 2**: Add the nonce into message and sign it.
- **Step 3**: Send the message + signature to retrieve your access token (`/signin/{address}`).
- **Step 4**: To sign out, sign your access token.
- **Step 5**: Send your access token along with your signature (`/signout/{address}`).
        """,
    },
    {
        "name": "GraphQL",
        "description": "Operations related to GraphQL queries and mutations.",
    },
]

env = Environment()
logger = CustomLogger(env.LOG_PATH)
adapter_app = FirebaseAdapter(env)
app = FastAPI(
    title="Backend",
    version="0.5.0",
    redoc_url="/",
    openapi_tags=tags_metadata
)
app.middleware("http")(get_authentication_token)


if env.ENV == "devnet":
    from fastapi.middleware.cors import CORSMiddleware

    env.JWT_SECRET_KEY = "JWT_SECRET_KEY"
    env.DOMAIN = "localhost:8080"
    logger = CustomLogger(env.LOG_PATH, True)

    origins = [
        "http://localhost",
        "http://localhost:3000",
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
