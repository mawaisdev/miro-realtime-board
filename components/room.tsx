'use client'

import { ClientSideSuspense } from '@liveblocks/react'
import { LiveList, LiveMap, LiveObject } from '@liveblocks/client'

import { Layer } from '@/types/canvas'
import { RoomProvider } from '@/liveblocks.config'

interface RoomProps {
  children: React.ReactNode
  roomId: string
  fallback: NonNullable<React.ReactNode> | null
}
export const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: [],
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList<string>(),
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  )
}
