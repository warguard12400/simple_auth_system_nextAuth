import MainLoginComp from '@/components/my-components/auth/login'
import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const LoginPage = async () => {
  const session = await getServerSession()

  if (session) {
    redirect('/dashboard')
  }
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <MainLoginComp />
    </div>
  )
}

export default LoginPage
