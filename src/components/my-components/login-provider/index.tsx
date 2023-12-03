import { Button } from '@/components/ui/button'
import { details } from '@/constants'
import { signIn } from 'next-auth/react'
import React from 'react'

const LoginProviderComp = () => {
  const handleOAuthSignIn = (provider: string) => {
    signIn(provider)
  }

  return (
    <div className='grid grid-cols-2 gap-6'>
      {details.providers.map((provider, i) => (
        <Button
          key={i}
          variant='outline'
          onClick={() => handleOAuthSignIn(provider?.providerName)}
          type='button'
        >
          {provider.providerName}
        </Button>
      ))}
    </div>
  )
}

export default LoginProviderComp
