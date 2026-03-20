import MessageBubble from "./MessageBubble"
import type { ChatMessage } from "../services/Api"

interface ChatWindowProps {
	currentUser: string | null
	messages: ChatMessage[]
	isLoading: boolean
	selectedUser: string | null
}

function ChatWindow({ currentUser, messages, isLoading, selectedUser }: ChatWindowProps) {
	if (!selectedUser) {
		return <div style={{ flex: 1, padding: "20px" }}>Pick a user from the sidebar.</div>
	}

	if (isLoading) {
		return <div style={{ flex: 1, padding: "20px" }}>Loading chat history...</div>
	}

	return (
		<div style={{ flex: 1, overflowY: "auto", padding: "16px", background: "#fafafa" }}>
			{messages.length === 0 ? (
				<div>No messages yet. Say hello.</div>
			) : (
				messages.map((message, index) => (
					<MessageBubble
						key={message._id ?? `${message.sender}-${message.timestamp}-${index}`}
						isOwnMessage={message.sender === currentUser}
						message={message.message}
						sender={message.sender}
						timestamp={message.timestamp}
					/>
				))
			)}
		</div>
	)
}

export default ChatWindow
