from app.Database.db import messages_collection
from fastapi.encoders import jsonable_encoder
from app.models.message_models import create_message_document


def serialize_message(document):
    if document.get("_id") is not None:
        document["_id"] = str(document["_id"])
    return jsonable_encoder(document)


async def save_message(sender, receiver, message):

    document = create_message_document(sender, receiver, message)

    result = await messages_collection.insert_one(document)

    document["_id"] = result.inserted_id

    return serialize_message(document)

async def get_chat_history(user1,user2):
    query={
        "$or":[
            {"sender":user1,"receiver":user2},
            {"sender":user2,"receiver":user1}
        ]
    }
    cursor=messages_collection.find(query).sort("timestamp",1)
    messages=[]
    async for message in cursor:
        messages.append(serialize_message(message))
    return messages