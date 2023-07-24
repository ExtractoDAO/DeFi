from chain_vission.login.router import router
from chain_vission import adapter_app
from fastapi import status, Header
from fastapi.responses import JSONResponse


@router.get(path="/signout/{address}", status_code=status.HTTP_200_OK)
async def signout(address: str, x_authorization: str = Header(None)):
    token = adapter_app.get_data(f"/tokens/{address}")
    if token != x_authorization:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Unauthorized"}
        )
    adapter_app.delete_data(f"/tokens/{address}")
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": True})
