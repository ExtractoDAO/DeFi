from fastapi.responses import JSONResponse
from chain_vission.login.router import router
from chain_vission import adapter_app
from pydantic import BaseModel
from typing import Optional
from fastapi import status
import datetime
from jose import jwt
from siwe import (
    SiweMessage,
    ExpiredMessage,
    DomainMismatch,
    NonceMismatch,
    MalformedSession,
    InvalidSignature,
)

DOMAIN = "localhost:8080"
SECRET_KEY = "secretkey"


def expiration_time():
    exp = datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    return int(exp.timestamp())


class Cache(BaseModel):
    token: Optional[str]
    nonce: Optional[str]


class SignIn(BaseModel):
    message: str
    signature: str


def validate_nonce(nonce: str):
    if cache_memory.nonce != nonce:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED, content="Nonce Mismatch"
        )


def validate_signature(msg: SiweMessage, signature: str):
    try:
        msg.verify(signature, domain=DOMAIN, nonce=cache_memory.nonce)
    except ValueError:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content="Authentication attempt rejected: Unknow error",
        )
    except ExpiredMessage:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content="Authentication attempt rejected: Expired Message",
        )
    except DomainMismatch:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content="Authentication attempt rejected: Domain mismatch",
        )
    except NonceMismatch:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content="Authentication attempt rejected: Nonce mismatch",
        )
    except MalformedSession as error:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content=f"Authentication attempt rejected: {error}",
        )
    except InvalidSignature:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content="Authentication attempt rejected: Invalid Signature",
        )


def generate_jwt_token(siwe_msg: SiweMessage, signin: SignIn):
    if cache_memory.token:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content="User already logged in",
        )
    if (result := validate_nonce(siwe_msg.nonce)) is not None:
        return result
    if (result := validate_signature(siwe_msg, signin.signature)) is not None:
        return result

    exp = expiration_time()
    payload = {
        "exp": exp,
        "address": siwe_msg.address,
        "nonce": cache_memory.nonce,
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    adapter_app.delete_data(f"/nonces/{siwe_msg.address}")
    adapter_app.set_data(f"/tokens/{siwe_msg.address}", token)

    return JSONResponse(
        status_code=status.HTTP_200_OK, content={"token": token, "expiration": exp}
    )


@router.post(path="/signin", status_code=status.HTTP_201_CREATED)
async def get_sign(signin: SignIn):
    siwe_msg = SiweMessage(signin.message)
    global cache_memory
    cache_memory = Cache(
        token=adapter_app.get_data(f"/tokens/{siwe_msg.address}"),
        nonce=adapter_app.get_data(f"/nonces/{siwe_msg.address}"),
    )
    return generate_jwt_token(siwe_msg, signin)
