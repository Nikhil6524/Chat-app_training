# This file contains the data model for messages in the chat application. 
from datetime import datetime


def create_message_document(sender, receiver, message):

    return {
        "sender": sender,
        "receiver": receiver,
        "message": message,
        "timestamp": datetime.utcnow()
    }