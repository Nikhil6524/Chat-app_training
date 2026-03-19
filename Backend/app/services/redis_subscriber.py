# app/services/redis_subscriber.py

import json
from app.core.redis import redis_client
from app.websockets.websocket_Manager import manager

def start_redis_listener():
    pubsub = redis_client.pubsub()
    pubsub.subscribe("chat_channel")

    print("Redis subscriber started...")

    for message in pubsub.listen():
        if message["type"] == "message":
            data = json.loads(message["data"])
            print("Received from Redis:", data)

            receiver = data["receiver"]
            sender = data["sender"]

            payload = json.dumps(data)

            # Send to receiver
            manager.loop.create_task(
                manager.send_personal_message(receiver, payload)
            )

            # Send to sender (echo back)
            manager.loop.create_task(
                manager.send_personal_message(sender, payload)
            )