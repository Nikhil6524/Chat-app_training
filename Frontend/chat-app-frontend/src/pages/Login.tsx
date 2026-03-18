import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/Api"
import { useAuthStore } from "../store/AuthStore"

function Login() {

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

    <div style={{padding: "50px"}}>

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">Login</button>
        <br></br>

        <br></br>
        <button onClick={()=>navigate("/register")}>
            Register
        </button>

      </form>

    </div>

  )

}

export default Login