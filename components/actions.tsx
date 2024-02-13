'use client'

import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import { Link2 } from 'lucide-react'

import { toast } from 'sonner'

interface ActionsProps {
  id: string
  title: string
  children: React.ReactNode
  side?: DropdownMenuContentProps['side']
  sideOffset?: DropdownMenuContentProps['sideOffset']
}

export const Actions = ({
  id,
  children,
  title,
  sideOffset,
  side,
}: ActionsProps) => {
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success('Link Copied to Clipboard'))
      .catch(() => toast.error('Failed to Copy link'))
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className='w-60'
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem className='p-3 cursor-pointer' onClick={onCopyLink}>
          <Link2 className='h-4 w-4 mr-2' />
          Copy Board Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
