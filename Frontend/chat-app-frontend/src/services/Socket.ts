export const createSocket = (token: string) => {

  const socket = new WebSocket(
    `ws://backend:8000/ws?token=${token}`
  )

  return socket
}