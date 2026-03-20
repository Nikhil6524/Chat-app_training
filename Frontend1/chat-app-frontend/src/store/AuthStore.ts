import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState{
    token: string | null,
    username: string | null
    setAuth: (token: string, username: string)=> void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      username: null,
      setAuth: (token, username) =>
        set({
          token,
          username,
        }),
    }),
    {
      name: "chat-auth",
    }
  )
)// zustand state management for access token and username. 