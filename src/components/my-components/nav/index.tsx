'use client'
import { Button } from '@/components/ui/button'
import { details } from '@/constants'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const NavComp = () => {
  const { data: session } = useSession()

  return (
    <div className='bg-foreground px-4 fixed w-full'>
      <div className='flex items-center justify-between gap-5 container mx-auto'>
        <Link href={'/'} className=' font-bold text-xl text-white'>
          Titan Dev
        </Link>

        <div className='flex items-center uppercase'>
          {!session ? (
            details.navbarLinks.map((item, i) => (
              <Link
                key={i}
                href={item.path}
                className='hover:text-primary transition-all duration-200 text-white px-5 py-4'
              >
                {item.name}
              </Link>
            ))
          ) : (
            <Button className='my-4' onClick={() => signOut()}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavComp
