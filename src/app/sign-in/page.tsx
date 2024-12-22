import { OAuthButtons, SignInForm } from './_components'

export default function Page() {
  return (
    <div className='space-y-5 px-4 md:px-8'>
      <h1 className='mt-20 text-center font-bold text-4xl'>Sign In</h1>

      <SignInForm />

      <div className='mx-auto grid max-w-md gap-4'>
        <OAuthButtons />
      </div>
    </div>
  )
}
