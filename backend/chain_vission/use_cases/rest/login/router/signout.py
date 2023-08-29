from chain_vission.use_cases.rest.login.router import router
from fastapi import status, Header, HTTPException
from fastapi.responses import JSONResponse
from chain_vission import adapter_app


@router.delete(
    path="/signout/{address}",
    status_code=status.HTTP_200_OK,
    description="""
# Sign the message for signout
    """,
    responses={
        200: {
            "description": "Successful Response",
            "content": {"application/json": {"example": {"signout": True}}},
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
async def get_signout(address: str, x_authorization: str = Header(None)):
    token = adapter_app.get_data(f"/tokens/{address}")

    # validate_siwe_message
    # 1 - user must be sign the access token
    # 2 - send token + signaure to signout

    if token != x_authorization or token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication attempt rejected: Invalid Token",
        )
    adapter_app.delete_data(f"/tokens/{address}")
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": True})
