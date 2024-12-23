'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Priority, SortBy } from '@/constants/todos'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function FindTodos() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleReset = () => {
    replace(pathname)
  }

  return (
    <section className='mb-8 w-full'>
      <Card className='rounded-lg border-none p-4 shadow-lg'>
        <CardHeader>
          <CardTitle className='font-bold text-2xl'>Todos Query</CardTitle>
        </CardHeader>
        <form>
          <CardContent className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div>
              <Label
                htmlFor='due_date'
                className='block font-medium text-lg text-neutral-700'
              >
                Due date
              </Label>
              <Input
                id='due_date'
                name='due_date'
                type='date'
                defaultValue={searchParams.get('due_date')?.toString()}
                className='mt-1 block w-full rounded-md border border-neutral-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              />
            </div>
            <div>
              <Label
                htmlFor='priority'
                className='block font-medium text-lg text-neutral-700'
              >
                Priority
              </Label>
              <Select
                name='priority'
                defaultValue={
                  searchParams.get('priority')?.toString() ?? Priority.ANY
                }
              >
                <SelectTrigger className='rounded-md border border-neutral-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Priority.ANY}>ANY</SelectItem>
                  <SelectItem value={Priority.P1}>P1</SelectItem>
                  <SelectItem value={Priority.P2}>P2</SelectItem>
                  <SelectItem value={Priority.P3}>P3</SelectItem>
                  <SelectItem value={Priority.P4}>P4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor='completed'
                className='block font-medium text-lg text-neutral-700'
              >
                Completion status
              </Label>
              <Select
                name='completed'
                defaultValue={
                  searchParams.get('completed')?.toString() ?? 'All'
                }
              >
                <SelectTrigger className='rounded-md border border-neutral-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='All'>All</SelectItem>
                  <SelectItem value='true'>Completed</SelectItem>
                  <SelectItem value='false'>In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor='sortBy'
                className='block font-medium text-lg text-neutral-700'
              >
                Sort by
              </Label>
              <Select
                name='sortBy'
                defaultValue={
                  searchParams.get('sortBy')?.toString() ??
                  SortBy.TITLE.toString()
                }
              >
                <SelectTrigger className='rounded-md border border-neutral-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={SortBy.TITLE}>Title</SelectItem>
                  <SelectItem value={SortBy.PRIORITY}>Priority</SelectItem>
                  <SelectItem value={SortBy.DUE_DATE}>Due Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className='mt-6 flex justify-end space-x-4'>
            <Button
              type='button'
              onClick={handleReset}
              className='rounded-md bg-neutral-300 px-4 py-2 text-neutral-800 shadow-sm hover:bg-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2'
            >
              Reset
            </Button>
            <Button
              type='submit'
              className='rounded-md bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Apply
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  )
}
