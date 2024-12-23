'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { SignUp } from '@/app/_actions/auth'

import { useToast } from '@/hooks/use-toast'
import { authFormSchema } from '@/schemas'

import { FormFieldWrapper } from '@/components/form-field-wrapper'
import { LoaderSpin } from '@/components/loader-spin'
import { Button } from '@/components/ui/button'
import { Form, FormMessage } from '@/components/ui/form'

import type { SubmitHandler } from 'react-hook-form'
import type { z } from 'zod'

type Inputs = z.infer<ReturnType<typeof authFormSchema>>

export function SignUpForm() {
  const { toast } = useToast()
  const [pending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(
      authFormSchema(
        'Email is required',
        'Password must contain at least 6 character(s)',
        'Name is required'
      )
    ),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async data => {
    startTransition(async () => {
      const result = await SignUp(data)

      if (!result?.success && result.type === 'form') {
        form.setError('root.random', {
          type: 'random',
          message: result?.error,
        })
        return
      }

      if (!result?.success && result.type === 'supabase') {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: result?.error,
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className='mx-auto max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormFieldWrapper
          form={form}
          name='name'
          label='Name'
          placeholder='Enter your name'
        />

        <FormFieldWrapper
          form={form}
          type='email'
          name='email'
          label='Email'
          placeholder='Enter your email'
        />

        <FormFieldWrapper
          form={form}
          name='password'
          label='Password'
          placeholder='Enter your password'
        />

        <Button
          type='submit'
          disabled={pending}
          aria-disabled={pending}
          className='btn-red mt-[48px] w-full'
        >
          {pending ? (
            <span className='flex items-center justify-center gap-3'>
              <LoaderSpin className='h-6 w-6' />
              Sign Up...
            </span>
          ) : (
            <span>Sign Up</span>
          )}
        </Button>
        {form.formState.errors.root?.random && (
          <FormMessage data-testid='global-error'>
            {form.formState.errors.root.random.message}
          </FormMessage>
        )}

        <Button asChild variant='link'>
          <Link href='/sign-in' className='!px-0'>
            Sign In
          </Link>
        </Button>
      </form>
    </Form>
  )
}
