import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/SideBar"
import ChatWindow from "../components/ChatWindow"
import MessageInput from "../components/MessageInput"
import { getMessages, type ChatMessage } from "../services/Api"
import { createSocket } from "../services/Socket"
import { useAuthStore } from "../store/AuthStore"

function Chat() {
  const token = useAuthStore((state) => state.token)
  const username = useAuthStore((state) => state.username)
  const navigate = useNavigate()

  const socketRef = useRef<WebSocket | null>(null)
  const selectedUserRef = useRef<string | null>(null)

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [draftMessage, setDraftMessage] = useState("")
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)

  useEffect(() => {
    if (!token || !username) {
      navigate("/")
    }
  }, [navigate, token, username])

  useEffect(() => {
    selectedUserRef.current = selectedUser
  }, [selectedUser])

  useEffect(() => {
    if (!token) return

    const ws = createSocket(token)
    socketRef.current = ws

    ws.onmessage = (event) => {
      try {
        const incoming: ChatMessage = JSON.parse(event.data)

        const activeUser = selectedUserRef.current

        if (!username || !activeUser) return

        const belongsToOpenConversation =
          (incoming.sender === username && incoming.receiver === activeUser) ||
          (incoming.sender === activeUser && incoming.receiver === username)

        if (belongsToOpenConversation) {
          setMessages((prev) => [...prev, incoming])
        }
      } catch (error) {
        console.error("Failed to parse socket message", error)
      }
    }

    return () => {
      ws.close()
      socketRef.current = null
    }
  }, [token, username])

  useEffect(() => {
    if (!selectedUser || !token) {
      setMessages([])
      return
    }

    const loadMessages = async () => {
      try {
        setIsLoadingHistory(true)
        const history = await getMessages(selectedUser, token)
        setMessages(history)
      } catch (error) {
        console.error("Failed to load chat history", error)
        setMessages([])
      } finally {
        setIsLoadingHistory(false)
      }
    }

    loadMessages()
  }, [selectedUser, token])

  const sendMessage = () => {
    const ws = socketRef.current
    const message = draftMessage.trim()

    if (!ws || ws.readyState !== WebSocket.OPEN || !selectedUser || !message) return

    ws.send(
      JSON.stringify({
        receiver: selectedUser,
        message,
      })
    )

    setDraftMessage("")
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        currentUser={username}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
          <h2 style={{ margin: 0 }}>
            {selectedUser ? `Chat with ${selectedUser}` : "Select a user to start chatting"}
          </h2>
        </div>

        <ChatWindow
          currentUser={username}
          messages={messages}
          isLoading={isLoadingHistory}
          selectedUser={selectedUser}
        />

        <MessageInput
          disabled={!selectedUser}
          message={draftMessage}
          onChange={setDraftMessage}
          onSend={sendMessage}
        />
      </div>
    </div>
  )
}

export default Chat