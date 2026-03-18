from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json

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
origins = [
    "http://localhost:5173",   
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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
            payload_json = json.dumps(saved_message)

            await manager.send_personal_message(receiver, payload_json)
            await manager.send_personal_message(username, payload_json)

    except WebSocketDisconnect:
        manager.disconnect(username)