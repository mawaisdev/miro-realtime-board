'use client'

import { Info } from '@/app/board/[boardId]/_components/info'
import { Toolbar } from '@/app/board/[boardId]/_components/toolbar'
import { Participants } from '@/app/board/[boardId]/_components/participants'

import { useSelf } from '@/liveblocks.config'
interface CanvasProps {
  boardId: string
}

export const Canvas = ({}: CanvasProps) => {
  const me = useSelf((me) => me.info)
  console.log(me)
  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none'>
      <Info />
      <Participants />
      <Toolbar />
    </main>
  )
}
