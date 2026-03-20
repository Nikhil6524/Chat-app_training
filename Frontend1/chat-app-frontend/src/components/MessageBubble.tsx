interface MessageBubbleProps {
	sender: string
	message: string
	timestamp: string
	isOwnMessage: boolean
}

function MessageBubble({ sender, message, timestamp, isOwnMessage }: MessageBubbleProps) {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: isOwnMessage ? "flex-end" : "flex-start",
				marginBottom: "10px",
			}}
		>
			<div
				style={{
					maxWidth: "70%",
					padding: "10px 12px",
					borderRadius: "12px",
					background: isOwnMessage ? "#d4f7dc" : "#ffffff",
					border: "1px solid #e5e5e5",
				}}
			>
				<div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>{sender}</div>
				<div>{message}</div>
				<div style={{ fontSize: "11px", color: "#888", marginTop: "6px", textAlign: "right" }}>
					{new Date(timestamp).toLocaleString()}
				</div>
			</div>
		</div>
	)
}

export default MessageBubble
