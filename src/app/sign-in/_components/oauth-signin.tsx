'use client'

import { oAuthSignIn } from '@/app/_actions/auth'
import GitHubIcon from '/public/img/github.svg'

import { Button } from '@/components/ui/button'

import type { Provider } from '@supabase/supabase-js'
type OAuthProvider = {
  name: Provider
  displayName: string
  icon?: JSX.Element
}

export function OAuthButtons() {
  const oAuthProviders: OAuthProvider[] = [
    {
      name: 'github',
      displayName: 'GitHub',
      icon: <GitHubIcon className='size-5 fill-white' />,
    },
  ]

  return (
    <>
      {oAuthProviders.map(provider => (
        <Button
          key={provider.name}
          className='flex w-full items-center justify-center gap-2'
          onClick={async () => {
            await oAuthSignIn(provider.name)
          }}
        >
          {provider.icon}
          Continue with {provider.displayName}
        </Button>
      ))}
    </>
  )
}
