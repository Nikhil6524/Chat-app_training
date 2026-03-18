from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.jwt_handler import verify_token

security=HTTPBearer()

#Dependecy injection function to get the current user from the token
def get_current_user(credentials: HTTPAuthorizationCredentials=Depends(security)):
    token=credentials.credentials
    try:
        payload=verify_token(token)
        return payload
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))