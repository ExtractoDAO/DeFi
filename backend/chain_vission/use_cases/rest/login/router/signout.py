from chain_vission.use_cases.rest.login.router import router
from fastapi.responses import JSONResponse
from chain_vission import adapter_app
from fastapi import status


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
        }
    }
)
async def get_signout(address: str):
    remove_token(address)
    return JSONResponse(status_code=status.HTTP_200_OK, content={})
