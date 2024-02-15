'use client'

import { Info } from '@/app/board/[boardId]/_components/info'
import { Toolbar } from '@/app/board/[boardId]/_components/toolbar'
import { Participants } from '@/app/board/[boardId]/_components/participants'

interface CanvasProps {
  boardId: string
}

export const Canvas = ({ boardId }: CanvasProps) => {
  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none'>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </main>
  )
}
