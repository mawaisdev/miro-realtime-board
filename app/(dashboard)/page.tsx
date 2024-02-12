'use client'

import { useOrganization } from '@clerk/nextjs'

import { EmptyOrg } from '@/app/(dashboard)/_component/empty-org'
import { BoardList } from '@/app/(dashboard)/_component/board-list'

interface DashboardPageProps {
  searchParams: {
    search?: string
    favorites?: string
  }
}

const Dashboard = ({ searchParams }: DashboardPageProps) => {
  const { organization } = useOrganization()
  return (
    <div className='flex-1 h-[calc(100%-80px)] p-6'>
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  )
}

export default Dashboard
