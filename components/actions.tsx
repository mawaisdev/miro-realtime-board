'use client'

import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import { Link2, Pen, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { useRenameModel } from '@/store/use-rename-model'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api'

import { ConfirmModel } from '@/components/confirm-model'
import { Button } from '@/components/ui/button'
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
  const { onOpen } = useRenameModel()
  const { mutate, pending } = useApiMutation(api.board.remove)
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success('Link Copied to Clipboard'))
      .catch(() => toast.error('Failed to Copy link'))
  }

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success('Board Removed Successfully'))
      .catch(() => toast.error('Failed to Remove Board'))
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

        <DropdownMenuItem
          className='p-3 cursor-pointer'
          onClick={() => onOpen(id, title)}
        >
          <Pen className='h-4 w-4 mr-2' />
          Rename
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <ConfirmModel
          header='Delete Board?'
          description='This will delete board and all its content'
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button
            className='p-3 cursor-pointer w-full text-sm justify-start font-normal'
            variant='ghost'
          >
            <Trash2 className='h-4 w-4 mr-2' />
            Delete
          </Button>
        </ConfirmModel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
