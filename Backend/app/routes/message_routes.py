from fastapi import APIRouter, Depends
from app.services.message_services import get_chat_history
from app.core.dependencies import get_current_user

router=APIRouter()

@router.get("/messages/{other_user}")
async def fetch_messages(
    other_user: str,
    user=Depends(get_current_user)
):
    current_user = user["username"]
    messages=await get_chat_history(current_user, other_user)
    return messages