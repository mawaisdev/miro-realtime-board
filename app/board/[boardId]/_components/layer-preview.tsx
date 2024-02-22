'use client'

import { memo } from 'react'

import { useStorage } from '@/liveblocks.config'
import { LayerType } from '@/types/canvas'

import { Text } from '@/app/board/[boardId]/_components/text'
import { Ellipse } from '@/app/board/[boardId]/_components/ellipse'
import { Rectangle } from '@/app/board/[boardId]/_components/rectangle'

interface LayerPreviewProps {
  id: string
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void
  selectionColor?: string
}

export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id))
    if (!layer) {
      return null
    }

    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
            layer={layer}
          />
        )
      case LayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        )
      case LayerType.Text:
        return (
          <Text
            id={id}
            selectionColor={selectionColor}
            onPointerDown={onLayerPointerDown}
            layer={layer}
          />
        )
      default:
        console.warn('Unknown Layer Type')
        return null
    }
  }
)

LayerPreview.displayName = 'LayerPreview'
