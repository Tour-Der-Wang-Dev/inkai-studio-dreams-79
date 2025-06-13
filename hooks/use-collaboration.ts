
import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useCanvasStore } from '@/stores/canvas-store'

export const useCollaboration = (designId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const { addCollaborator, updateCollaborator, removeCollaborator } = useCanvasStore()

  useEffect(() => {
    const newSocket = io('/design-collaboration', {
      query: { designId }
    })

    newSocket.on('connect', () => {
      console.log('Connected to collaboration server')
      newSocket.emit('join-design', designId)
    })

    newSocket.on('user-joined', (collaborator) => {
      addCollaborator(collaborator)
    })

    newSocket.on('user-left', (userId) => {
      removeCollaborator(userId)
    })

    newSocket.on('cursor-update', ({ userId, cursor }) => {
      updateCollaborator(userId, { cursor })
    })

    newSocket.on('canvas-update', (canvasData) => {
      // Handle real-time canvas updates
      console.log('Canvas updated by collaborator:', canvasData)
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [designId, addCollaborator, updateCollaborator, removeCollaborator])

  return socket
}
