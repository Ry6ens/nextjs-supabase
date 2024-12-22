import { ChevronsUpDown, LogOut } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import type { User } from '@supabase/supabase-js'
import { SignOut } from '@/app/_actions/auth'

interface Props {
  user: User | null
}

export function AppSidebarFooter({ user }: Props) {
  const handleSignOut = async () => {
    await SignOut()
  }

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className='h-13'>
                <div className='flex items-center gap-2 overflow-hidden'>
                  <Avatar>
                    <AvatarImage alt='' src={user?.user_metadata.avatar_url} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className='font-bold'>
                      {user?.user_metadata.full_name}
                    </div>
                    <div className='overflow-hidden text-ellipsis'>
                      {user?.user_metadata.email}
                    </div>
                  </div>
                </div>
                <div>
                  <ChevronsUpDown className='ml-auto' />
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='top' align='start' className='w-fit'>
              <DropdownMenuItem className='pointer-events-none'>
                <Avatar>
                  <AvatarImage alt='' src={user?.user_metadata.avatar_url} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <div className='font-bold'>
                    {user?.user_metadata.full_name}
                  </div>
                  <div>{user?.user_metadata.email}</div>
                </div>
              </DropdownMenuItem>
              <Separator className='my-2' />
              <DropdownMenuItem>
                <Button
                  variant='ghost'
                  type='button'
                  className='w-full justify-start px-0'
                  onClick={handleSignOut}
                >
                  <LogOut />
                  Log out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
