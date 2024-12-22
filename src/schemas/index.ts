import { object, string, boolean, number } from 'zod'

export const todoFormSchema = (
  error_title: string,
  error_description: string,
  error_due_date: string,
  error_priority: string,
  error_completed: string
) => {
  return object({
    id: number(),
    title: string().trim().min(3, { message: error_title }),
    description: string().trim().min(3, { message: error_description }),
    due_date: string().min(1, { message: error_due_date }),
    priority: string().trim().min(1, { message: error_priority }),
    completed: boolean().refine(val => typeof val === 'boolean', {
      message: error_completed,
    }),
  })
}

export const authFormSchema = (
  error_email: string,
  error_password: string,
  error_name?: string
) => {
  return object({
    email: string().trim().email({ message: error_email }),
    password: string().trim().min(6, { message: error_password }),
    name: string().trim().min(3, { message: error_name }).optional(),
  })
}
