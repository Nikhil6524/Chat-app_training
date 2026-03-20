#routes for user authentication
from fastapi import APIRouter
from app.schema.user_schema import UserLogin,UserRegister
from app.services.auth_services import user_register,user_login

router=APIRouter()

@router.post("/register")
async def register(user: UserRegister):
    result=await user_register(user.username, user.password)
    return result

@router.post("/login")
async def login(user: UserLogin):
    result=await user_login(user.username,user.password)
    return result