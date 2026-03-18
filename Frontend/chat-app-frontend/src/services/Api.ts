import axios from "axios";

export interface ChatMessage {
    _id?: string
    sender: string
    receiver: string
    message: string
    timestamp: string
}

const API=axios.create({
    baseURL:"http://localhost:8000"
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