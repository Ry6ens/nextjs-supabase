import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'

      if (isLocalEnv) {
        console.log('isLocalEnv', isLocalEnv)
        console.log('origin-next', `${origin}${next}`)

        return NextResponse.redirect(`${origin}${next}`)
      }
      if (forwardedHost) {
        console.log('forwardedHost', forwardedHost)
        console.log('origin-next', `${forwardedHost}${next}`)

        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      }

      console.log('origin-next', `${origin}${next}`)
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
