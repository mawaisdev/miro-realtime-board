import { Loader } from 'lucide-react'

import { Info } from '@/app/board/[boardId]/_components/info'
import { Toolbar } from '@/app/board/[boardId]/_components/toolbar'
import { Participants } from '@/app/board/[boardId]/_components/participants'

export const Loading = () => {
  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center'>
      <Loader className='h-6 w-6 text-muted-foreground animate-spin' />
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </main>
  )
}
