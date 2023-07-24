from chain_vission.login.router import router
from chain_vission import memory_pool
from fastapi import status
from fastapi.responses import JSONResponse


@router.get(path="/signout/{address}", status_code=status.HTTP_200_OK)
async def signout(address: str):
    if memory_pool.get(address, False):
        del memory_pool[address]
        return JSONResponse(status_code=status.HTTP_200_OK, content=True)
    else:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content="addres not login")
