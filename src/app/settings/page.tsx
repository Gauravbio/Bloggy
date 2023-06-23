export const metadata={
    title: 'settings',
    description: 'Manage account and website settings'
}

import UserNameForm from '@/components/UserNameForm';
import { authOptions, getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    const session=await getAuthSession();
    if(!session?.user) {
        redirect(authOptions.pages?.signIn || '/sign-in')
    }


  return (
    <div className='max-w-4xl mx-auto py-12 '>
        <div className="grid items-start gap-8">
            <h1 className="font-bold text-3xl md:text-4xl">Settings</h1>
        </div>

        <div className="grid gap-10">
            <UserNameForm user={{
                // @ts-ignore
                id: session.user.id,
                username: session.user.name || ''
            }} />
        </div>
    </div>
  )
}

export default page