interface MessageInputProps {
	message: string
	disabled: boolean
	onChange: (value: string) => void
	onSend: () => void
}

function MessageInput({ message, disabled, onChange, onSend }: MessageInputProps) {
	return (
		<div
			style={{
				display: "flex",
				gap: "10px",
				padding: "14px",
				borderTop: "1px solid #ddd",
				background: "#fff",
			}}
		>
			<input
				value={message}
				disabled={disabled}
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						onSend()
					}
				}}
				placeholder={disabled ? "Select a user to start messaging" : "Type your message"}
				style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
			/>

			<button
				type="button"
				disabled={disabled || !message.trim()}
				onClick={onSend}
				style={{
					padding: "10px 16px",
					borderRadius: "8px",
					border: "none",
					background: disabled || !message.trim() ? "#c8c8c8" : "#2563eb",
					color: "#fff",
					cursor: disabled || !message.trim() ? "not-allowed" : "pointer",
				}}
			>
				Send
			</button>
		</div>
	)
}

export default MessageInput
