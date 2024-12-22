import { TodoForm } from '../_components'
import Breadcrumbs from '@/components/breadcrumbs'

export default function Page() {
  return (
    <div className='space-y-5 py-4'>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Todos', href: '/todos' },
          {
            label: 'Add todo',
            href: '/todos/add',
            active: true,
          },
        ]}
      />

      <h1 className='text-center font-bold text-2xl'>Add Todo</h1>
      <div className='w-full'>
        <TodoForm />
      </div>
    </div>
  )
}
