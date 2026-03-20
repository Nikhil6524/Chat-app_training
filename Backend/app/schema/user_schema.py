#user schema for validating user registration and login data in the chat application
from pydantic import BaseModel

class UserRegister(BaseModel):
    username:str
    password:str

class UserLogin(BaseModel):
    username:str
    password:str