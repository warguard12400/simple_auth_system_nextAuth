'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { userRegisterInterface } from '@/types'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoginProviderComp from '../../login-provider'

const MainLoginComp = () => {
  const [loading, setLoading] = useState<boolean>(false)
  // To redirect user use use router
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userRegisterInterface>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  register('password', {
    required: 'Password is required',
    // pattern: {
    //   value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[^ ]+[A-Za-z\d@$!%*?&]*$/,
    //   message: "Password must contain at least one letter, one number, and one special character and should not contain spaces",
    // },
  })

  register('email', {
    required: 'Email address is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address format',
    },
  })

  const handleSubmitForm = async (data: userRegisterInterface) => {
    // toast loading
    const toastLoading = toast.loading('processing...')
    try {
      setLoading(true)
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })
      if (response?.status === 401) {
        throw new Error('401 error')
      }

      toast.success('Successfully signed in')
      setLoading(false)
      router.push('/dashboard')
      router.refresh()
    } catch (error: any) {
      setLoading(false)
      // toast error
      toast.error('Failed!', error?.message)
    } finally {
      // toast close
      toast.dismiss(toastLoading)
    }
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 container mx-auto p-2 sm:p-[2rem] gap-y-4'>
      {/* left side */}
      <div className='text-white'>left side</div>
      {/* right side */}
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Card className='py-2 sm:py-4 rounded-[12px]'>
          <CardHeader className='space-y-2'>
            <CardTitle className='text-2xl'>Login your account</CardTitle>
            <CardDescription>
              Enter your email below to login your account
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            {/* buttons */}
            <LoginProviderComp />
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-sm uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>

            {/* inputs */}
            {/* email */}
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                {...register('email')}
              />
              {errors?.email && (
                <span className='text-red-500 text-sm'>
                  {errors?.email?.message}
                </span>
              )}
            </div>
            {/* password */}
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' {...register('password')} />
              {errors?.password && (
                <span className='text-red-500 text-sm'>
                  {errors?.password?.message}
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={loading} type='submit' className='w-full'>
              Login account
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default MainLoginComp
