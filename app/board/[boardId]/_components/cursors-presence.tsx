'use client'

import { memo } from 'react'

import { shallow } from '@liveblocks/client'
import { useOthersConnectionIds, useOthersMapped } from '@/liveblocks.config'

import { Path } from '@/app/board/[boardId]/_components/path'
import { Cursor } from '@/app/board/[boardId]/_components/cursor'

import { colorToCSS } from '@/lib/utils'

const Cursors = () => {
  const ids = useOthersConnectionIds()
  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  )
}

const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      pencilColor: other.presence.pencilColor,
    }),
    shallow
  )

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.pencilColor ? colorToCSS(other.pencilColor) : '#000'}
            />
          )
        }
        return null
      })}
    </>
  )
}

export const CursorsPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  )
})

CursorsPresence.displayName = 'CursorsPresence'
