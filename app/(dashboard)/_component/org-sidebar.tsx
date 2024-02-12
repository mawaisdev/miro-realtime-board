'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'
import { OrganizationSwitcher } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

import { useSearchParams } from 'next/navigation'

import { LayoutDashboard, Star } from 'lucide-react'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

export const OrganizationalSidebar = () => {
  const searchParams = useSearchParams()
  const favorites = searchParams.get('favorites')

  return (
    <div className='hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5 '>
      <Link href='/'>
        <div className='flex items-center gap-x-2'>
          <Image src='/logo.svg' alt='logo' height={60} width={60} />
          <span className={cn('font-semibold text-2xl', font.className)}>
            RtBoard
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            },
            organizationSwitcherTrigger: {
              padding: '6px',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              justifyContent: 'space-between',
              backgroundColor: 'white',
            },
          },
        }}
      />
      <div className='space-y-1 w-full'>
        <Button
          asChild
          size='lg'
          className='font-normal justify-start px-2 w-full'
          variant={favorites ? 'ghost' : 'secondary'}
        >
          <Link href='/'>
            <LayoutDashboard className='h-4 w-4 mr-2' />
            Team Boards
          </Link>
        </Button>

        <Button
          asChild
          size='lg'
          className='font-normal justify-start px-2 w-full'
          variant={favorites ? 'secondary' : 'ghost'}
        >
          <Link
            href={{
              pathname: '/',
              query: { favorites: true },
            }}
          >
            <Star className='h-4 w-4 mr-2' />
            Favorite Boards
          </Link>
        </Button>
      </div>
    </div>
  )
}
