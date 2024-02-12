'use client'

import { EmptySearch } from '@/app/(dashboard)/_component/empty-search'
import { EmptyBoards } from '@/app/(dashboard)/_component/empty-boards'
import { EmptyFavorites } from '@/app/(dashboard)/_component/empty-favorites'

interface BoardListProps {
  orgId: string
  query: {
    search?: string
    favorites?: string
  }
}

export const BoardList = ({ query }: BoardListProps) => {
  const data = [] // TODO: Change it to API Call

  if (!data.length && query.search) return <EmptySearch />
  if (!data.length && query.favorites) return <EmptyFavorites />

  if (!data.length) return <EmptyBoards />
}
