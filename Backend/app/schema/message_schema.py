from pydantic import BaseModel
from datetime import datetime


class MessageSchema(BaseModel):

    sender: str
    receiver: str
    message: str
    timestamp: datetime