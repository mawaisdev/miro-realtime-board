'use client'

import { useState, useEffect } from 'react'
import { RenameModel } from '@/components/modals/rename-modal'

export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <RenameModel />
    </>
  )
}
