from chain_vission.use_cases.rest.login.router import router
from fastapi.responses import JSONResponse
from fastapi import HTTPException
from chain_vission import env, adapter_app
from pydantic import BaseModel
from typing import Optional
from fastapi import status
from jose import jwt
import datetime
from siwe import (
    SiweMessage,
    ExpiredMessage,
    DomainMismatch,
    NonceMismatch,
    MalformedSession,
    InvalidSignature,
)


def expiration_time():
    exp = datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    return int(exp.timestamp())


class Cache(BaseModel):
    token: Optional[str]
    nonce: Optional[str]


class SignIn(BaseModel):
    message: str
    signature: str


def validate_siwe_message(siwe_msg: SiweMessage) -> Optional[str]:
    if (
        siwe_msg.domain != env.DOMAIN
        or siwe_msg.chain_id != env.CHAIN_ID
        or siwe_msg.statement != env.SIWE_STATEMENT
        or siwe_msg.version != env.SIWE_VERSION
    ):
        return "Authentication attempt rejected: Invalid Message"


def validate_nonce(nonce: str) -> Optional[str]:
    if cache_memory.nonce != nonce:
        return "Authentication attempt rejected: Nonce Mismatch"


def validate_signature(msg: SiweMessage, signature: str) -> Optional[str]:
    try:
        msg.verify(
            signature,
            domain=env.DOMAIN,
            nonce=cache_memory.nonce,
        )
    except ValueError:
        return "Authentication attempt rejected: Unknow error"
    except ExpiredMessage:
        return "Authentication attempt rejected: Expired Message"
    except DomainMismatch:
        return "Authentication attempt rejected: Domain mismatch"
    except NonceMismatch:
        return "Authentication attempt rejected: Nonce mismatch"
    except MalformedSession as error:
        return f"Authentication attempt rejected: {error}"
    except InvalidSignature:
        return "Authentication attempt rejected: Invalid Signature"


def generate_jwt_token(siwe_msg: SiweMessage, signin: SignIn) -> (str, int):
    exp = expiration_time()
    payload = {
        "exp": exp,
        "address": siwe_msg.address,
        "nonce": cache_memory.nonce,
    }
    token = jwt.encode(payload, env.JWT_SECRET_KEY, algorithm="HS256")
    adapter_app.delete_data(f"/nonces/{siwe_msg.address}")
    adapter_app.set_data(f"/tokens/{siwe_msg.address}", token)

    return token, exp


def validation_request(siwe_msg: SiweMessage, signature: str) -> Optional[str]:
    if cache_memory.token:
        return "User already logged in"
    if (error_message := validate_siwe_message(siwe_msg)) is not None:
        return error_message
    if (error_message := validate_nonce(siwe_msg.nonce)) is not None:
        return error_message
    if (error_message := validate_signature(siwe_msg, signature)) is not None:
        return error_message


@router.post(
    description="""
# Use it here to request your access token.
- **Get your nonce here `/nonce/{address}`**
    """,
    path="/signin/{address}",
    status_code=status.HTTP_201_CREATED,
    responses={
        201: {
            "description": "Successful Response",
            "content": {
                "application/json": {
                    "example": {"token": "string", "expiration_time": 1234567890}
                }
            },
        },
        401: {
            "description": "Unauthorized",
            "content": {
                "application/json": {
                    "example": {"details": "Authentication attempt rejected: ..."}
                }
            },
        },
    },
)
async def get_signin(signin: SignIn, address: str):
    siwe_msg = SiweMessage(signin.message)
    global cache_memory
    cache_memory = Cache(
        token=adapter_app.get_data(f"/tokens/{address}"),
        nonce=adapter_app.get_data(f"/nonces/{address}"),
    )

    if (error_message := validation_request(siwe_msg, signin.signature)) is not None:
        return HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=error_message
        )
    else:
        (token, expiration) = generate_jwt_token(siwe_msg, signin)
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={"token": token, "expiration": expiration},
        )
