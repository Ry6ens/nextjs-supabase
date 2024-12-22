'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { createClient } from '@/utils/supabase/server'

import { todoFormSchema } from '@/schemas'

import type { z } from 'zod'

type FormData = z.infer<ReturnType<typeof todoFormSchema>>

export async function AddTodo(formData: FormData) {
  const schema = todoFormSchema(
    'Title is required',
    'Description is required',
    'DueDate is required',
    'Priority is required',
    'Completed is required'
  )
  const parsed = schema.safeParse(formData)
  if (parsed.error) {
    const formattedErrors = parsed.error.format()
    const errorMessage = Object.values(formattedErrors).flat().join(', ')

    return { success: false, type: 'form', error: errorMessage }
  }

  const supabase = await createClient()

  const todoData = {
    title: formData.title,
    description: formData.description,
    due_date: formData.due_date,
    priority: formData.priority,
    completed: formData.completed,
  }

  const { error } = await supabase.from('todos').insert([todoData])

  if (error) {
    console.error('supabase', error.message)
    return {
      success: false,
      type: 'supabase',
      error: 'Failed to insert todo',
    }
  }

  revalidatePath('/todos')
  redirect('/todos')
}
