from chain_vission.use_cases.rest.login.router import router
from fastapi.responses import JSONResponse
from chain_vission import adapter_app
from fastapi import status, Header


@router.get(path="/signout/{address}", status_code=status.HTTP_200_OK)
async def signout(address: str, x_authorization: str = Header(None)):
    token = adapter_app.get_data(f"/tokens/{address}")

    if token != x_authorization or token is None:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Unauthorized"}
        )
    adapter_app.delete_data(f"/tokens/{address}")
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": True})
