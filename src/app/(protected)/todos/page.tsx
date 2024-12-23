import { Suspense } from 'react'

import { GetTodos } from '@/app/_actions/todos'

import { FindTodos, LoadingSkeleton, TodosList } from './_components'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ searchParams }: Props) {
  const todos = GetTodos({ searchParams })

  return (
    <div className='space-y-5 py-4'>
      <FindTodos />
      <Suspense fallback={<LoadingSkeleton />}>
        <TodosList todos={todos} />
      </Suspense>
    </div>
  )
}
