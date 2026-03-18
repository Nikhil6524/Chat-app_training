from fastapi import APIRouter
from app.Database.db import db

router = APIRouter()

users_collection = db["users"]

@router.get("/users")
async def get_users():

    users = []

    async for user in users_collection.find():

        users.append({
            "username": user["username"]
        })

    return users