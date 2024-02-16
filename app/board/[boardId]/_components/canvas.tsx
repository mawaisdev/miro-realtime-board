'use client'

import { useCallback, useState } from 'react'

import { Info } from '@/app/board/[boardId]/_components/info'
import { Toolbar } from '@/app/board/[boardId]/_components/toolbar'
import { Participants } from '@/app/board/[boardId]/_components/participants'
import { CursorsPresence } from '@/app/board/[boardId]/_components/cursors-presence'

import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useMutation,
} from '@/liveblocks.config'
import { Camera, CanvasMode, CanvasState } from '@/types/canvas'
import { pointerEventToCanvasPoint } from '@/lib/utils'

interface CanvasProps {
  boardId: string
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  })
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })

  const { undo, redo } = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera(({ x, y }) => ({
      x: x - e.deltaX,
      y: y - e.deltaY,
    }))
  }, [])

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])
  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault()

      const current = pointerEventToCanvasPoint(e, camera)
      setMyPresence({ cursor: current })
    },
    []
  )

  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none'>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={undo}
        redo={redo}
      />
      <svg
        className='h-[100vh] w-[100vw]'
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}
