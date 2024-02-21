import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { Camera, Color, Layer, Point, Side, XYWH } from '@/types/canvas'

const COLORS = [
  '#FFC0CB',
  '#FF69B4',
  '#FF1493',
  '#C71585',
  '#FF4500',
  '#FF8C00',
  '#FFA07A',
  '#FF7F50',
  '#FF6347',
  '#FF0000',
  '#FFD700',
  '#ADFF2F',
  '#32CD32',
  '#00FA9A',
  '#00FFFF',
  '#00CED1',
  '#40E0D0',
  '#48D1CC',
  '#00BFFF',
  '#1E90FF',
  '#0000FF',
  '#8A2BE2',
  '#4B0082',
  '#9400D3',
  '#8B008B',
  '#FF00FF',
  '#FF69B4',
  '#FF1493',
  '#C71585',
  '#FF4500',
  '#FF8C00',
  '#FFA07A',
  '#FF7F50',
  '#FF6347',
  '#FF0000',
  '#FFD700',
  '#FFFF00',
  '#ADFF2F',
  '#00FF00',
]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ConnectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length]
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  }
}

export function colorToCSS({ r, g, b }: Color) {
  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  }

  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width)
    result.width = Math.abs(bounds.x + bounds.width - point.x)
  }

  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x)
    result.width = Math.abs(point.x - bounds.x)
  }

  if ((corner & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height)
    result.height = Math.abs(bounds.y + bounds.height - point.y)
  }

  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y)
    result.height = Math.abs(point.y - bounds.y)
  }
  return result
}

export function findIntersectingLayersWithRectangle(
  layerIds: readonly string[],
  layers: ReadonlyMap<string, Layer>,
  a: Point,
  b: Point
) {
  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  }

  const ids = []

  for (const layerId of layerIds) {
    const layer = layers.get(layerId)

    if (layer == null) {
      continue
    }

    const { x, y, width, height } = layer

    if (
      rect.x + rect.width > x &&
      rect.x < x + width &&
      rect.y + rect.height > y &&
      rect.y < y + height
    ) {
      ids.push(layerId)
    }
  }

  return ids
}
