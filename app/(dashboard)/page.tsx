'use client'

import { EmptyOrg } from '@/app/(dashboard)/_component/empty-org'
import { useOrganization } from '@clerk/nextjs'

const Dashboard = () => {
  const { organization } = useOrganization()
  return (
    <div className='flex-1 h-[calc(100%-80px)] p-6'>
      {!organization ? <EmptyOrg /> : <p>Boards List</p>}
    </div>
  )
}

export default Dashboard
