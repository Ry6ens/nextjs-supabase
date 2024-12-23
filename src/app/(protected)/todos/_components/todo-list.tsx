'use client'

import { use, useEffect } from 'react'

import { useToast } from '@/hooks/use-toast'
import { DeleteTodo } from '@/app/_actions/todos'

import { TodoForm } from '.'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import type { Todo } from '@/types/todo'

type Props = {
  todos: Promise<{
    data: Todo[]
  }>
}

export function TodosList({ todos }: Props) {
  const { data } = use(todos)
  const { toast } = useToast()

  useEffect(() => {
    if (!data?.length) {
      toast({
        title: 'Todos',
        description: 'Nothing found for your query.',
      })
    }
  }, [data, toast])

  if (!data?.length) {
    return null
  }

  return (
    <section className='flex min-h-screen w-full max-w-4xl flex-col items-center rounded-lg'>
      <div className='w-full max-w-3xl overflow-hidden rounded-lg shadow-lg'>
        <Accordion type='single' collapsible className='space-y-4 p-4'>
          {data.map(todo => (
            <AccordionItem
              value={todo.id.toString()}
              key={todo.id}
              className='rounded-lg shadow-sm'
            >
              <AccordionTrigger className='flex items-center justify-between border-neutral-200 border-b p-4 font-semibold text-gray-700 text-lg transition-colors duration-300 hover:bg-neutral-100 [&[data-state=open]]:bg-neutral-100'>
                <span className='flex-1'>
                  Priority: {todo.priority} | Due: {todo.due_date} | Task:{' '}
                  {todo.title}
                </span>
                <span
                  className={`ml-4 font-light text-sm ${todo.completed ? 'text-green-500' : 'text-yellow-500'}`}
                >
                  {todo.completed ? 'Completed' : 'In Progress'}
                </span>
              </AccordionTrigger>

              <AccordionContent className='bg-neutral-100 p-4'>
                <form
                  action={DeleteTodo}
                  className='flex items-center justify-between'
                >
                  <input type='hidden' name='id' value={todo.id} />
                  <Button variant='destructive' type='submit'>
                    Delete
                  </Button>
                </form>
                <div className='mt-4 border-gray-300 border-t pt-4'>
                  <TodoForm todo={todo} isUpdateTodo />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
