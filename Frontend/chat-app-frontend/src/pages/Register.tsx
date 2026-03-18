import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../services/Api"

function Register() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {

    e.preventDefault()

    try {

      await register(username, password)

      alert("Registration successful")

      navigate("/")

    } catch (error) {

      alert("Registration failed")

    }

  }

  return (

    <div style={{padding: "50px"}}>

      <h2>Register</h2>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <br/><br/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <br/><br/>

        <button type="submit">Register</button>

      </form>

    </div>

  )

}

export default Register