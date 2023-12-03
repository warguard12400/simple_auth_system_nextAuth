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
import axios from 'axios'
import { Github } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import LoginProviderComp from '../../login-provider'

const MainRegisterComp = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userRegisterInterface>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  // form validate
  register('name', {
    required: 'Name is required',
    minLength: { value: 4, message: 'Your name > 4' },
    maxLength: { value: 100, message: 'Your name < 100' },
  })
  register('password', {
    required: 'Password is required',
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[^ ]+[A-Za-z\d@$!%*?&]*$/,
      message:
        'Password must contain at least one letter, one number, and one special character and should not contain spaces',
    },
  })

  register('email', {
    required: 'Email address is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address format',
    },
  })
  // end form validation

  // form handle submit
  const handleSubmitForm = async (data: userRegisterInterface) => {
    // toast loading
    const toastLoading = toast.loading('processing ...')
    try {
      setLoading(true)
      const resp = await axios.post('api/users/register', data)
      toast.success('User registration completed successfully please login.')
      setLoading(false)
      router.push('/login')
      router.refresh()
    } catch (error: any) {
      toast.error(error?.response?.data?.error)
      setLoading(false)
    } finally {
      // close toast
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
            <CardTitle className='text-2xl'>Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
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
            {/* name */}
            <div className='grid gap-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                type='name'
                placeholder='John Doe'
                {...register('name')}
              />
              {errors?.name && (
                <span className='text-red-500 text-sm'>
                  {errors?.name?.message}
                </span>
              )}
            </div>
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
              Create account
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default MainRegisterComp
