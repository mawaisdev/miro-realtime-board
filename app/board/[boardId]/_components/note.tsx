import { Kalam } from 'next/font/google'

import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

import { cn, colorToCSS, getContrastingTextColor } from '@/lib/utils'
import { useMutation } from '@/liveblocks.config'
import { NoteLayer } from '@/types/canvas'

const font = Kalam({
  subsets: ['devanagari'],
  weight: '400',
})

interface NoteProps {
  id: string
  layer: NoteLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

const calculateFontSize = (width: number, height: number) => {
  const MAX_FONT_SIZE = 96
  const SCALE_FACTOR = 0.15

  const fontSizeBasedOnHeight = height * SCALE_FACTOR
  const fontSizeBasedOnWidth = width * SCALE_FACTOR

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, MAX_FONT_SIZE)
}

export const Note = ({
  id,
  layer,
  selectionColor,
  onPointerDown,
}: NoteProps) => {
  const { x, y, width, height, fill, value } = layer

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get('layers')

    liveLayers.get(id)?.set('value', newValue)
  }, [])

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value)
  }

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
        backgroundColor: fill ? colorToCSS(fill) : '#000',
      }}
      className='shadow-md drop-shadow-xl'
    >
      <ContentEditable
        html={value || 'Text'}
        onChange={handleContentChange}
        className={cn(
          'h-full w-full flex items-center justify-center text-center outline-none',
          font.className
        )}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? getContrastingTextColor(fill) : '#000',
        }}
      />
    </foreignObject>
  )
}
