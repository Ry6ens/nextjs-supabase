'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { AddTodo, UpdateTodo } from '@/app/_actions/todos'

import { Priority } from '@/constants/todos'
import { useToast } from '@/hooks/use-toast'
import { todoFormSchema } from '@/schemas'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { LoaderSpin } from '@/components/loader-spin'
import { FormFieldWrapper } from '@/components/form-field-wrapper'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { z } from 'zod'
import type { Todo } from '@/types/todo'
import type { SubmitHandler } from 'react-hook-form'

type Inputs = z.infer<ReturnType<typeof todoFormSchema>>

type Props = {
  isUpdateTodo?: boolean
  todo?: Todo
}

export function TodoForm({ todo, isUpdateTodo = false }: Props) {
  const { toast } = useToast()
  const [pending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(
      todoFormSchema(
        'Title is required',
        'Description is required',
        'DueDate is required',
        'Priority is required',
        'Completed is required'
      )
    ),
    defaultValues: {
      id: todo?.id || 0,
      title: todo?.title || '',
      description: todo?.description || '',
      due_date: todo?.due_date || '',
      priority: todo?.priority || '',
      completed: todo?.completed || false,
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async data => {
    startTransition(async () => {
      const result = isUpdateTodo ? await UpdateTodo(data) : await AddTodo(data)

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

      if (result.success) {
        toast({
          title: data.title,
          description: 'Updated',
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className='mx-auto max-w-2xl space-y-4 rounded-lg bg-white p-8 shadow-lg'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormFieldWrapper form={form} name='id' type='hidden' />

        <FormFieldWrapper
          form={form}
          name='title'
          label='Title'
          placeholder='Enter title'
        />

        <FormFieldWrapper
          form={form}
          name='description'
          label='Description'
          type='textarea'
          rows={4}
          placeholder='Enter description'
        />

        <FormFieldWrapper
          form={form}
          name='due_date'
          label='Due Date'
          type='date'
          placeholder='Enter due Date'
          className='w-1/3'
        />

        <FormField
          control={form.control}
          name='priority'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={todo?.priority ?? Priority.ANY}
                  name='priority'
                  required
                >
                  <SelectTrigger className='mt-1 w-1/3 rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Priority.P1}>P1</SelectItem>
                    <SelectItem value={Priority.P2}>P2</SelectItem>
                    <SelectItem value={Priority.P3}>P3</SelectItem>
                    <SelectItem value={Priority.P4}>P4</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='completed'
          render={({ field }) => (
            <FormItem className='flex items-center gap-2 space-y-0'>
              <FormLabel className='order-2 font-medium text-gray-700 text-lg'>
                Is Completed
              </FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className='order-1'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
              {isUpdateTodo ? 'Updating...' : 'Adding...'}
            </span>
          ) : (
            <span>{isUpdateTodo ? 'Update' : 'Add'}</span>
          )}
        </Button>
        {form.formState.errors.root?.random && (
          <FormMessage data-testid='global-error'>
            {form.formState.errors.root.random.message}
          </FormMessage>
        )}
      </form>
    </Form>
  )
}
