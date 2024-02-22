import { getSvgPathFromStroke } from '@/lib/utils'
import getStroke from 'perfect-freehand'

interface PathProps {
  x: number
  y: number
  points: number[][]
  fill: string
  stroke?: string
  onPointerDown?: (e: React.PointerEvent) => void
}

export const Path = ({
  fill,
  points,
  x,
  y,
  onPointerDown,
  stroke,
}: PathProps) => {
  return (
    <path
      className='drop-shadow-md'
      onPointerDown={onPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 16,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        })
      )}
      style={{
        transform: `translate(
        ${x}px,
        ${y}px
      )`,
      }}
      x={0}
      y={0}
      fill={fill}
      stroke={stroke}
      strokeWidth='1'
    />
  )
}
