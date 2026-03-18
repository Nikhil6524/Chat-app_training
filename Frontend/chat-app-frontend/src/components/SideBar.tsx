import { useEffect, useState } from "react"
import { getUsers } from "../services/Api"

interface User {
  username: string
}

interface SidebarProps {
  currentUser: string | null
  selectedUser: string | null
  onSelectUser: (username: string) => void
}

function Sidebar({ currentUser, selectedUser, onSelectUser }: SidebarProps) {

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {

    const loadUsers = async () => {

      const data = await getUsers()

      setUsers(data)

    }

    loadUsers()

  }, [])

  return (

    <div style={{ width: "250px", borderRight: "1px solid #ddd", padding: "12px" }}>

      <h3>Users</h3>

      {users
        .filter((user) => user.username !== currentUser)
        .map((user) => (

          <div
            key={user.username}
            onClick={() => onSelectUser(user.username)}
            style={{
              cursor: "pointer",
              padding: "10px",
              marginBottom: "8px",
              borderRadius: "8px",
              background: selectedUser === user.username ? "#eef3ff" : "#f7f7f7",
              fontWeight: selectedUser === user.username ? 700 : 500,
            }}
          >

            {user.username}

          </div>

        ))}

    </div>

  )

}

export default Sidebar