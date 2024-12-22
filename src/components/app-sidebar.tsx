'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Home, LayoutList } from 'lucide-react'

import { cn } from '@/lib/utils'

import { AppSidebarFooter } from './app-sidebar-footer'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

import type { User } from '@supabase/supabase-js'

type Props = {
  data:
    | {
        user: User
      }
    | {
        user: null
      }
}

export function AppSidebar({ data }: Props) {
  const pathname = usePathname()

  const { setOpenMobile } = useSidebar()

  const handleSideBar = () => {
    setOpenMobile(false)
  }

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarMenu className='px-2'>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href='/'
                className={cn(pathname === '/' && 'bg-gray-100')}
                onClick={handleSideBar}
              >
                <Home className='h-6 w-6' />
                <span className='text-base'>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <Collapsible defaultOpen className='group/collapsible'>
            <SidebarMenuItem>
              <CollapsibleTrigger className='flex w-full items-center justify-between p-2'>
                <div className='flex items-center gap-2'>
                  <LayoutList className='h-4 w-4' />
                  <span>Todos</span>
                </div>

                <ChevronDown className='ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <Link
                        href='/todos/create'
                        className={cn(
                          pathname === '/todos/create' && 'bg-gray-100'
                        )}
                        onClick={handleSideBar}
                      >
                        Add
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <Link
                        href='/todos'
                        className={cn(pathname === '/todos' && 'bg-gray-100')}
                        onClick={handleSideBar}
                      >
                        List
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>

      <AppSidebarFooter user={data.user} />
    </Sidebar>
  )
}
