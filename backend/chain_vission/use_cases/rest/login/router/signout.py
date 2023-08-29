from chain_vission.use_cases.rest.login.router import router
from fastapi.responses import JSONResponse
from chain_vission import env, adapter_app
from fastapi import status, HTTPException
from pydantic import BaseModel
from typing import Optional
import jwt
from siwe import (
    SiweMessage,
    ExpiredMessage,
    DomainMismatch,
    NonceMismatch,
    MalformedSession,
    InvalidSignature,
)


class SignOut(BaseModel):
    message: str
    signature: str


def validate_signature(msg: SiweMessage, signature: str) -> Optional[str]:
    try:
        msg.verify(
            signature,
            domain=env.DOMAIN,
            nonce=msg.nonce,
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


def extract_nonce(address: str) -> str:
    token = adapter_app.get_data(f"/tokens/{address}")
    try:
        payload = jwt.decode(token, env.JWT_SECRET_KEY, algorithms=["HS256"])
        return payload.get("nonce")
    except jwt.ExpiredSignatureError:
        return "Authentication attempt rejected: Expired Message"
    except jwt.DecodeError:
        return "Authentication attempt rejected: DecodedError"
    except jwt.InvalidTokenError:
        return "Authentication attempt rejected: Invalid Token"


def validate_siwe_message(siwe_msg: SiweMessage) -> Optional[str]:
    if (
        siwe_msg.domain != env.DOMAIN
        or siwe_msg.chain_id != int(env.CHAIN_ID)
        or siwe_msg.nonce != extract_nonce(siwe_msg.address)
        or siwe_msg.statement != env.SIGNOUT_MESSAGE
        or siwe_msg.version != env.SIWE_VERSION
    ):
        return "Authentication attempt rejected: Invalid Message"


def validation_request(siwe_msg: SiweMessage, signature: str) -> Optional[str]:
    if (error_message := validate_siwe_message(siwe_msg)) is not None:
        return error_message
    if (error_message := validate_signature(siwe_msg, signature)) is not None:
        return error_message


def remove_token(address: str):
    adapter_app.delete_data(f"/tokens/{address}")


@router.post(
    path="/signout/{address}",
    status_code=status.HTTP_200_OK,
    description="""
# Sign the message for signout
    """,
    responses={
        200: {
            "description": "Successful Response",
            "content": {"application/json": {"example": {}}},
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
async def get_signout(signin: SignOut, address: str):
    siwe_msg = SiweMessage(signin.message)

    if error_message := validation_request(siwe_msg, signin.signature):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=error_message
        )
    else:
        remove_token(address)
        return JSONResponse(status_code=status.HTTP_200_OK, content={})
