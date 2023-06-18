import Link from 'next/link'
import React from 'react'
import UserAuthForm from './UserAuthForm'
import { Icons } from './Icons'

const SignUp = () => {
    return (
        <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] '>
            <div className="flex flex-col space-y-2 text-center">
                <Icons.logo className='mx-auto h-6 w-6' />
                <h1 className='text-2xl font-semibold tracking-tighter'>Sign up</h1>
                <p className="text-sm max-w-xs mx-auto">
                    By continuing you are setting up a Bloggy account and agree  to our user agreement and privacy policy.
                </p>
    
                {/* signin form */}
                <UserAuthForm />
                <p className='px-8 text-center text-sm text-zinc-700'>
                    Already a member{' '}
                    <Link href='/sign-in' className='hover:text-zinc-800 text-sm underline underline-offset-4'>Sign in</Link>
                </p>
            </div>
        </div>
      )
}

export default SignUp