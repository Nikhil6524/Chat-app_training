const buildSocketUrl = (token: string) => {
  const envBase = import.meta.env.VITE_WS_BASE_URL as string | undefined
  if (envBase && envBase.length > 0) {
    return `${envBase.replace(/\/$/, "")}/ws?token=${token}`
  }

  const protocol = window.location.protocol === "https:" ? "wss" : "ws"
  const host = window.location.hostname
  return `${protocol}://${host}:8000/ws?token=${token}`
}

export const createSocket = (token: string) => {
  const socket = new WebSocket(buildSocketUrl(token))
  return socket
}