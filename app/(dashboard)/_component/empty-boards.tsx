'use client'

import Image from 'next/image'

import { Button } from '@/components/ui/button'

import { api } from '@/convex/_generated/api'
import { useOrganization } from '@clerk/nextjs'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { toast } from 'sonner'

export const EmptyBoards = () => {
  const { organization } = useOrganization()
  const { mutate, pending } = useApiMutation(api.boards.create)

  const onClick = () => {
    if (!organization) return

    mutate({
      title: 'Untitled',
      orgId: organization?.id,
    })
      .then((id) => {
        toast.success('Board Created')

        //TODO: Redirect to board/{id}
      })
      .catch(() => toast.error('Failed to create board'))
  }

  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <Image src='/note.svg' alt='Empty' width={110} height={110} />
      <h2 className='font-semibold text-2xl mt-6'>Create Your First board!</h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Start by creating a board for your organization...
      </p>
      <div className='mt-6'>
        <Button
          size='lg'
          variant='default'
          onClick={onClick}
          disabled={pending}
        >
          Create Board
        </Button>
      </div>
    </div>
  )
}
