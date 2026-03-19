import axios from "axios";

export interface ChatMessage {
    _id?: string
    sender: string
    receiver: string
    message: string
    timestamp: string
}

const buildApiBaseUrl = () => {
    const envBase = import.meta.env.VITE_API_BASE_URL as string | undefined
    if (envBase && envBase.length > 0) {
        return envBase.replace(/\/$/, "")
    }

    const host = window.location.hostname
    return `${window.location.protocol}//${host}:8000`
}

const API = axios.create({
    baseURL: buildApiBaseUrl()
})

export const login= async(username: string, password: string)=>{
    const response=await API.post("/login",{
        username,
        password
    })

    return response.data
}

export const getMessages = async (
    otherUser: string,
    token:string
): Promise<ChatMessage[]> => {

    const response=await API.get(`/messages/${otherUser}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

export const register = async (username: string, password: string) => {

  const response = await API.post("/register", {
    username,
    password
  })


  return response.data
}

export const getUsers = async () => {

  const response = await API.get("/users")

  return response.data

}