'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/utils/supabase/server'

export async function DeleteTodo(formData: FormData) {
  const supabase = await createClient()

  const todoId = formData.get('id')?.toString()

  const { error } = await supabase.from('todos').delete().eq('id', todoId)

  if (error) {
    throw new Error(`Failed to delete todo: ${error.message}`)
  }

  revalidatePath('/todos')
}
