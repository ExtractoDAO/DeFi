from chain_vission.login.router import router
from fastapi.responses import JSONResponse
from chain_vission import adapter_app
from fastapi import status
import siwe


@router.get(path="/nonce/{address}", status_code=status.HTTP_201_CREATED)
async def get_nonce(address: str):
    nonce: str = siwe.generate_nonce()
    adapter_app.set_data(f"/nonces/{address}", nonce)

    return JSONResponse(status_code=status.HTTP_201_CREATED, content={"nonce": nonce})
