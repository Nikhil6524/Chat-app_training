from jose import jwt
from datetime import datetime, timedelta, timezone

SECRET_KEY= "veryveryconfidential" #random secret key
ALGORITHM= "HS512"
ACCESS_TOKEN_EXPIRE_HOURS=24 #token avaialble for 1 day

def create_access_token(data: dict):
    to_encode=data.copy()

    expiry=datetime.now(timezone.utc)+timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)

    to_encode.update({"exp": int(expiry.timestamp())})

    token=jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token

def verify_token(token:str):
    try:
        payload=jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.JWTError:
        raise Exception("Invalid Token")