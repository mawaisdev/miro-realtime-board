import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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

export const ConnectionIdToColor = (connectionId: number): string => {
  return COLORS[connectionId % COLORS.length]
}
