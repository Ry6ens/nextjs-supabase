import { createClient } from '@/utils/supabase/server'

import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  return (
    <SidebarProvider>
      <AppSidebar data={data} />
      <main className='w-full p-4 lg:p-6'>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
