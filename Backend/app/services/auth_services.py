from app.Database.db import db
from app.core.security import hash_password,verify_password
from app.core.jwt_handler import create_access_token

user_collection=db["users"]
async def user_register(username: str, password: str):
    existin_user=await user_collection.find_one({"username":username})

    if existin_user:
        raise Exception("user exists")
    
    hashed_password=hash_password(password=password)

    user_document={
        "username":username,
        "password":hashed_password
    }

    await user_collection.insert_one(user_document)
    return {"message": "User created successfully"}

async def user_login(username:str, password:str):
    user=await user_collection.find_one({"username":username})

    if not user:
        raise Exception("Wrong Username!")
    
    if not verify_password(password, user["password"]):
        raise Exception("Wrong Password....")
    
    token=create_access_token({
        "user_id": str(user["_id"]),
        "username":username
    })
    return {"access_token": token}