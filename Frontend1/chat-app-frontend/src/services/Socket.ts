const buildSocketUrl = (token: string) => {
  const envBase = import.meta.env.VITE_WS_BASE_URL as string | undefined
  if (envBase && envBase.length > 0) {
    return `${envBase.replace(/\/$/, "")}/ws?token=${token}`
  }

  const protocol = window.location.protocol === "https:" ? "wss" : "ws"
  const host = window.location.hostname
  return `${protocol}://${host}:8001/ws?token=${token}`
}// this function builds the websocket url based on environment variable or current window location and appends the authentication token 

export const createSocket = (token: string) => {
  const socket = new WebSocket(buildSocketUrl(token))
  return socket
}// creates and return socket