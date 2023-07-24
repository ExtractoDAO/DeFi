from fastapi.responses import JSONResponse
from chain_vission.login.router import router
from chain_vission import memory_pool
from pydantic import BaseModel
from fastapi import status
from siwe import (
    SiweMessage,
    ExpiredMessage,
    DomainMismatch,
    NonceMismatch,
    MalformedSession,
    InvalidSignature,
)

DOMAIN = "http://localhost:8080"


class SignIn(BaseModel):
    message: str
    signature: str


def validate_nonce(address: str, nonce: str):
    if memory_pool.get(address, "") != nonce:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED, content="Nonce Mismatch"
        )
    del memory_pool[address]


def validate_signature(msg: SiweMessage, signature: str):
    try:
        msg.verify(signature, domain=DOMAIN, nonce=memory_pool.get(msg.address, ""))
    except ValueError:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content="Authentication attempt rejected.",
        )
    except ExpiredMessage:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content="Authentication attempt rejected: Expired Message",
        )
    except DomainMismatch:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content="Authentication attempt rejected.",
        )
    except NonceMismatch:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED, content="Nonce Mismatch"
        )
    except MalformedSession as error:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content=f"Authentication attempt rejected: {error}",
        )
    except InvalidSignature:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content="Authentication attempt rejected.",
        )


@router.post(path="/signin", status_code=status.HTTP_201_CREATED)
async def get_sign(signin: SignIn):
    siwe_msg = SiweMessage(signin.message)

    validate_nonce(siwe_msg.address, siwe_msg.nonce)

    validate_signature(siwe_msg, signin.signature)

    return JSONResponse(status_code=status.HTTP_200_OK, content=True)
