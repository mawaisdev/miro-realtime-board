import Image from 'next/image'

import { CreateOrganization } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'

export const EmptyOrg = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <Image src='/elements.svg' alt='Empty' width={200} height={200} />
      <h2 className='text-2xl font-semibold mt-6'>
        Welcome to Miro Realtime Board
      </h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Create an Organization to Get Started...
      </p>
      <div className='mt-6'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='ghost' size='lg'>
              <Plus /> Create Organization
            </Button>
          </DialogTrigger>
          <DialogContent className='p-0 bg-transparent border-none max-w-[480px]'>
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
