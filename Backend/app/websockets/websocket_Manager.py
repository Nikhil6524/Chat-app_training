from fastapi import WebSocket
import asyncio

class ConnectionManager:
    def __init__(self):
        self.active_connections = {}
        self.loop = asyncio.get_event_loop()  # 🔥 IMPORTANT

    async def connect(self, user_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket
        print(f"{user_id} connected")

    def disconnect(self, user_id: str):
        if user_id in self.active_connections:
            del self.active_connections[user_id]
            print(f"{user_id} disconnected")

    async def send_personal_message(self, receiver: str, message: str):
        if receiver in self.active_connections:
            websocket = self.active_connections[receiver]
            await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections.values():
            await connection.send_text(message)


manager = ConnectionManager()