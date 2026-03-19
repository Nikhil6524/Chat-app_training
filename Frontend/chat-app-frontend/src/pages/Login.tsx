import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/Api"
import { useAuthStore } from "../store/AuthStore"

function Login() {

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f6f8",
    padding: "24px",
  }

  const cardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "360px",
    background: "#ffffff",
    border: "1px solid #e3e6ea",
    borderRadius: "10px",
    padding: "24px",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.06)",
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #d5d9df",
    fontSize: "14px",
    outline: "none",
  }

  const primaryButtonStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "none",
    background: "#1f2937",
    color: "#ffffff",
    fontSize: "14px",
    cursor: "pointer",
  }

  const secondaryButtonStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #d5d9df",
    background: "#ffffff",
    color: "#1f2937",
    fontSize: "14px",
    cursor: "pointer",
  }

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const setAuth = useAuthStore((state) => state.setAuth)

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault()

    try {

      const data = await login(username, password)

      setAuth(data.access_token, username)

      navigate("/chat")

    } catch (error) {

      alert("Login failed")

    }

  }

  return (

    <div style={pageStyle}>

      <div style={cardStyle}>

        <h2 style={{ margin: "0 0 16px" }}>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />

          <div style={{ height: "12px" }} />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <div style={{ height: "16px" }} />

          <button type="submit" style={primaryButtonStyle}>Login</button>

          <div style={{ height: "10px" }} />
          <button type="button" onClick={() => navigate("/register")} style={secondaryButtonStyle}>
            Register
          </button>

        </form>

      </div>

    </div>

  )

}

export default Login