from fastapi.responses import PlainTextResponse
from chain_vission.login.router import router
from chain_vission import memory_pool
from pydantic import BaseModel
from fastapi import status
import siwe


class Wallet(BaseModel):
    address: str


@router.get(path="/nonce/{address}", status_code=status.HTTP_201_CREATED)
async def get_nonce(address: str):
    nonce: str = siwe.generate_nonce()
    memory_pool[address] = nonce
    print(memory_pool)

    return PlainTextResponse(status_code=status.HTTP_201_CREATED, content=nonce)
