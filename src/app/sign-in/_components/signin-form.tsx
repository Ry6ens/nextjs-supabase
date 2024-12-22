'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { SignIn } from '@/app/_actions/auth'

import { useToast } from '@/hooks/use-toast'
import { authFormSchema } from '@/schemas'

import { FormFieldWrapper } from '@/components/form-field-wrapper'
import { LoaderSpin } from '@/components/loader-spin'
import { Button } from '@/components/ui/button'
import { Form, FormMessage } from '@/components/ui/form'

import type { SubmitHandler } from 'react-hook-form'
import type { z } from 'zod'

type Inputs = z.infer<ReturnType<typeof authFormSchema>>

export function SignInForm() {
  const { toast } = useToast()
  const [pending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(
      authFormSchema(
        'Email is required',
        'Password must contain at least 6 character(s)'
      )
    ),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async data => {
    startTransition(async () => {
      const result = await SignIn(data)

      if (!result?.success && result.type === 'form') {
        form.setError('root.random', {
          type: 'random',
          message: result?.error,
        })
        return
      }

      if (!result?.success && result.type === 'supabase') {
        if (result.code === 'email_not_confirmed') {
          toast({
            variant: 'destructive',
            title: result?.error,
            description: 'Check your email',
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: result?.error,
          })
        }
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
          type='email'
          name='email'
          label='Email'
          autoComplete='email'
          placeholder='Enter your email'
        />

        <FormFieldWrapper
          form={form}
          type='password'
          name='password'
          label='Password'
          autoComplete='current-password'
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
              Sign In...
            </span>
          ) : (
            <span>Sign In</span>
          )}
        </Button>
        {form.formState.errors.root?.random && (
          <FormMessage data-testid='global-error'>
            {form.formState.errors.root.random.message}
          </FormMessage>
        )}

        <Button asChild variant='link'>
          <Link href='/sign-up' className='!px-0'>
            Sign Up
          </Link>
        </Button>
      </form>
    </Form>
  )
}
