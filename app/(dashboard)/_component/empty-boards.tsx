import Image from 'next/image'

import { Button } from '@/components/ui/button'

export const EmptyBoards = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <Image src='/note.svg' alt='Empty' width={110} height={110} />
      <h2 className='font-semibold text-2xl mt-6'>Create Your First board!</h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Start by creating a board for your organization...
      </p>
      <div className='mt-6'>
        <Button size='lg' variant='outline'>
          Create Board
        </Button>
      </div>
    </div>
  )
}
