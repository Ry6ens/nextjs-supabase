'use server'

import { Priority, SortBy } from '@/constants/todos'
import { createClient } from '@/utils/supabase/server'

import type { Todo } from '@/types/todo'

type Props = {
  searchParams: any
}

export async function GetTodos({
  searchParams,
}: Props): Promise<{ data: Todo[] }> {
  const supabase = await createClient()

  let query = supabase
    .from('todos')
    .select()
    .order(getSortBy(searchParams.sortBy), { ascending: true })

  const priority = getPriority(searchParams.priority)

  if (priority !== Priority.ANY) {
    query = query.eq('priority', priority)
  }

  if (
    searchParams.completed !== undefined &&
    searchParams.completed !== 'All'
  ) {
    query = query.eq('completed', searchParams.completed)
  }

  const dueDate = getDueDate(searchParams.due_date)
  if (dueDate) {
    const formattedDate = formatDate(dueDate)
    query = query.eq('due_date', formattedDate)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to fetch todos: ${error.message}`)
  }

  return { data: data as Todo[] }
}

const getSortBy = (sortBy: SortBy): SortBy => {
  switch (sortBy) {
    case SortBy.PRIORITY:
      return SortBy.PRIORITY
    case SortBy.DUE_DATE:
      return SortBy.DUE_DATE
    default:
      return SortBy.TITLE
  }
}

const getPriority = (priority: Priority): Priority => {
  switch (priority) {
    case Priority.P1:
      return Priority.P1
    case Priority.P2:
      return Priority.P2
    case Priority.P3:
      return Priority.P3
    case Priority.P4:
      return Priority.P4
    default:
      return Priority.ANY
  }
}

const getDueDate = (dueDate: Date): Date | null => {
  return typeof dueDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dueDate)
    ? new Date(dueDate)
    : null
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}
