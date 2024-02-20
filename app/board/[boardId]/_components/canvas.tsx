'use client'

import { useCallback, useState } from 'react'

import { Info } from '@/app/board/[boardId]/_components/info'
import { Toolbar } from '@/app/board/[boardId]/_components/toolbar'
import { Participants } from '@/app/board/[boardId]/_components/participants'
import { LayerPreview } from '@/app/board/[boardId]/_components/layer-preview'
import { CursorsPresence } from '@/app/board/[boardId]/_components/cursors-presence'

import { nanoid } from 'nanoid'

import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useMutation,
  useStorage,
} from '@/liveblocks.config'
import { LiveObject } from '@liveblocks/client'

import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
} from '@/types/canvas'
import { pointerEventToCanvasPoint } from '@/lib/utils'

interface CanvasProps {
  boardId: string
}

const MAX_LAYERS = 100

export const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds)

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  })
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point
    ) => {
      const liveLayers = storage.get('layers')
      if (liveLayers.size >= MAX_LAYERS) {
        return
      }

      const liveLayerIds = storage.get('layerIds')
      const layerId = nanoid()
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      })

      liveLayerIds.push(layerId)
      liveLayers.set(layerId, layer)

      setMyPresence({ selection: [layerId] }, { addToHistory: true })
      setCanvasState({ mode: CanvasMode.None })
    },
    [lastUsedColor]
  )
  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera)

      if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point)
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        })
      }

      history.resume()
    },
    [camera, canvasState, history, insertLayer]
  )

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
        undo={history.undo}
        redo={history.redo}
      />
      <svg
        className='h-[100vh] w-[100vw]'
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={() => {}}
              selectionColor='#000'
            />
          ))}
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}
