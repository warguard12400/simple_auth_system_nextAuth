import MainRegisterComp from '@/components/my-components/auth/register'
import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const RegisterPage = async () => {
  const session = await getServerSession()
  if (session) {
    redirect('/dashboard')
  }
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <MainRegisterComp />
    </div>
  )
}

export default RegisterPage
