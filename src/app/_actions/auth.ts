'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { getURL } from '@/utils/helpers'
import { authFormSchema } from '@/schemas'
import { createClient } from '@/utils/supabase/server'

import type { Provider } from '@supabase/supabase-js'

import type { z } from 'zod'

type FormData = z.infer<ReturnType<typeof authFormSchema>>

export async function SignIn(formData: FormData) {
  const schema = authFormSchema(
    'Email is required',
    'Password must contain at least 6 character(s)'
  )
  const parsed = schema.safeParse(formData)
  if (parsed.error) {
    const formattedErrors = parsed.error.format()
    const errorMessage = Object.values(formattedErrors).flat().join(', ')

    return { success: false, type: 'form', error: errorMessage }
  }

  const supabase = await createClient()

  const signinData = {
    email: formData.email,
    password: formData.password,
  }

  const { error } = await supabase.auth.signInWithPassword(signinData)

  if (error) {
    console.error('supabase-error', error)

    if (error.code === 'email_not_confirmed') {
      return {
        success: false,
        type: 'supabase',
        code: 'email_not_confirmed',
        error: 'Please сonfirm your email!',
      }
    }
    return {
      success: false,
      type: 'supabase',
      error: 'Failed to sign-in',
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function SignUp(formData: FormData) {
  const schema = authFormSchema(
    'Email is required',
    'Password must contain at least 6 character(s)',
    'Name is required'
  )
  const parsed = schema.safeParse(formData)
  if (parsed.error) {
    const formattedErrors = parsed.error.format()
    const errorMessage = Object.values(formattedErrors).flat().join(', ')

    return { success: false, type: 'form', error: errorMessage }
  }

  const supabase = await createClient()

  const signupData = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        full_name: formData.name,
      },
    },
  }

  const { data, error } = await supabase.auth.signUp(signupData)

  if (error) {
    console.error('supabase-error', error)
    return {
      success: false,
      type: 'supabase',
      error: 'Failed to sign-up',
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function SignOut() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('supabase-error', error)
    throw new Error('Failed to sign out')
  }

  redirect('/signin')
}

export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    return redirect('/login?message=No provider selected')
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: getURL('/auth/callback'),
    },
  })

  if (error) {
    redirect('/login?message=Could not authenticate user')
  }

  return redirect(data.url)
}
