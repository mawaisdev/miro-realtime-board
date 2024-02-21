'use client'

import { colorToCSS } from '@/lib/utils'
import { Color } from '@/types/canvas'

interface ColorPickerProps {
  onChange: (color: Color) => void
}

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <div className='flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200'>
      <ColorButton color={{ r: 243, g: 82, b: 35 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 249, b: 177 }} onClick={onChange} />
      <ColorButton color={{ r: 68, g: 202, b: 99 }} onClick={onChange} />
      <ColorButton color={{ r: 39, g: 142, b: 237 }} onClick={onChange} />
      <ColorButton color={{ r: 155, g: 105, b: 245 }} onClick={onChange} />
      <ColorButton color={{ r: 252, g: 142, b: 42 }} onClick={onChange} />
      <ColorButton color={{ r: 0, g: 0, b: 0 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={onChange} />{' '}
    </div>
  )
}

interface ColorButtonProps {
  onClick: (color: Color) => void
  color: Color
}

export const ColorButton = ({ color, onClick }: ColorButtonProps) => {
  return (
    <button
      className='flex items-center justify-center w-8 h-8 hover:opacity-75 transition'
      onClick={() => onClick(color)}
    >
      <div
        className='h-8 w-8 rounded-md border border-neutral-300'
        style={{ background: colorToCSS(color) }}
      />
    </button>
  )
}
