import axios from "axios";

export interface ChatMessage {
    _id?: string
    sender: string
    receiver: string
    message: string
    timestamp: string
} // structure of chat message object used across the app

const buildApiBaseUrl = () => {
    const envBase = import.meta.env.VITE_API_BASE_URL as string | undefined
    if (envBase && envBase.length > 0) {
        return envBase.replace(/\/$/, "")
    }

    const host = window.location.hostname
    return `${window.location.protocol}//${host}:8001`
} // this function builds the base url for API calls based on environment variable or current window location. majorly used while containiering frontend and connecting it to backend
const API = axios.create({
    baseURL: buildApiBaseUrl()
})// creating an axios instance with the base url for making API calls

export const login= async(username: string, password: string)=>{
    const response=await API.post("/login",{
        username,
        password
    })

    return response.data
}// this function makes an API call to login endpoint with username and password and returns the response data which contains the access token

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
}// this function makes an API call to get chat history with another user. it requires the other user's username and the authentication token to fetch the messages

export const register = async (username: string, password: string) => {

  const response = await API.post("/register", {
    username,
    password
  })


  return response.data
}// user registration function

export const getUsers = async () => {

  const response = await API.get("/users")

  return response.data

}// list of all registered users