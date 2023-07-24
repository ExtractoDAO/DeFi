from chain_vission import adapter_app
from jose import jwt, JWTError
from typing import Optional

SECRET_KEY = "secretkey"

def verify_token(token: str) -> Optional[str]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except JWTError as e:
        return f"Authentication attempt rejected: {e}"

    address = payload["address"]
    stored_token = adapter_app.get_data(f"/tokens/{address}")

    if stored_token is None or stored_token != token:
        return "Authentication attempt rejected: Invalid token"

    return None
