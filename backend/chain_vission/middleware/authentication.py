from fastapi import Request


async def get_authentication_token(request: Request, call_next):
    token = request.headers.get("authorization")
    request.state.token = token
    return await call_next(request)
