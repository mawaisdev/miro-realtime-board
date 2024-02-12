'use client'

import { useOrganizationList } from '@clerk/nextjs'
import { Item } from '@/app/(dashboard)/_component/sidebar/item'

export const List = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: { infinite: true },
  })

  if (!userMemberships.data?.length) return null
  return (
    <ul className='space-y-4'>
      {userMemberships.data.map((member) => (
        <Item
          key={member.organization.id}
          id={member.organization.id}
          imageUrl={member.organization.imageUrl}
          name={member.organization.name}
        />
      ))}
    </ul>
  )
}
