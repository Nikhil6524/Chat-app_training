from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json
import threading

from app.core.redis import redis_client
from app.services.redis_subscriber import start_redis_listener
from app.core.jwt_handler import verify_token
from app.services.message_services import save_message
from app.routes.user_routes import router as user_router
from app.websockets.websocket_Manager import manager
from app.routes.message_routes import router as message_router
from app.routes.auth_routes import router as auth_router

app = FastAPI()

app.include_router(message_router)
app.include_router(auth_router)
app.include_router(user_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"status": "Chat backend running"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    token = websocket.query_params.get("token")

    if not token:
        await websocket.close(code=1008)
        return

    try:
        payload = verify_token(token)
    except Exception:
        await websocket.close(code=1008)
        return

    if payload is None:
        await websocket.close(code=1008)
        return

    username = payload["username"]

    await manager.connect(username, websocket)

    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)

            receiver = message_data["receiver"]
            message = str(message_data["message"]).strip()

            if not receiver or not message:
                continue

            saved_message = await save_message(username, receiver, message)
            print("Publishing to Redis:", saved_message)
            print("Received from Redis:", data)
            redis_client.publish(
                "chat_channel",
                json.dumps(saved_message)
            )

    except WebSocketDisconnect:
        manager.disconnect(username)


@app.on_event("startup")
def startup():

    redis_client.set("test_key", "hello_redis")
    value = redis_client.get("test_key")
    print("Redis test:", value)

    threading.Thread(target=start_redis_listener, daemon=True).start()