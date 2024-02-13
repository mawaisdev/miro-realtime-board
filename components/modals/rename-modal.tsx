'use client'

import { FormEventHandler, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog'

import { useRenameModel } from '@/store/use-rename-model'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api'

import { toast } from 'sonner'

export const RenameModel = () => {
  const { mutate, pending } = useApiMutation(api.board.update)

  const { isOpen, onClose, initialValues } = useRenameModel()
  const [title, setTitle] = useState<string>(initialValues.title)
  useEffect(() => {
    setTitle(initialValues.title)
  }, [initialValues.title])

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    mutate({
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success('Updated Successfully')
        onClose()
      })
      .catch(() => toast.error('Failed to rename board'))
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Board Title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>
        <form onSubmit={onSubmit} className='space-y-4'>
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Board title'
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} type='submit'>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
