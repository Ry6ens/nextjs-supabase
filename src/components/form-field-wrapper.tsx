import { cn } from '@/lib/utils'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'

interface FormFieldWrapperProps<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  label?: string
  placeholder?: string
  className?: string
  type?: 'text' | 'email' | 'textarea' | 'date' | 'hidden' | 'password'
  rows?: number
  autoComplete?: string
}

export function FormFieldWrapper<T extends FieldValues>(
  props: FormFieldWrapperProps<T>
) {
  const {
    form,
    name,
    label,
    // placeholder,
    className,
    type = 'text',
    // rows,
    ...restProps
  } = props

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === 'textarea' ? (
              <Textarea
                // rows={rows}
                // placeholder={placeholder}
                className={cn('resize-none rounded-none', className)}
                {...field}
                {...restProps}
              />
            ) : (
              <Input
                type={type}
                // placeholder={placeholder}
                // autoComplete={type === 'password' ? 'current-password' : 'on'}
                className={cn(
                  'rounded-none',
                  type === 'date' && 'block',
                  className
                )}
                {...field}
                {...restProps}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
