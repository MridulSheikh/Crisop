'use client'
import { UserAvatar } from '@/components/shared/UserAvatar'
import { Button } from '@/components/ui/button'
import { UpdateProfile } from '@/components/ui/profile/UpdateProfileModal'
import { useCurrentUser } from '@/redux/features/auth/authSlice'
import { useAppSelector } from '@/redux/hooks'
import { Key, Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Profile = () => {
  const user = useAppSelector(useCurrentUser);
  return (
    <div>
      <div className='w-full flex justify-between items-center'>
          <div className=' flex gap-x-5 items-center'>
              <UserAvatar userName='mridul sheikh' className=' size-20' />
              <div>
                <h1 className=' text-2xl'>{user?.name}</h1>
                <p className=' mt-0.5 text-gray-600'>{user?.email}</p>
              </div>
          </div>
          <div className=' flex gap-x-2'>
               <UpdateProfile />
               <Button variant={"outline"}> <Mail/> Change email</Button>
               <Button> <Key/> Change Password</Button>
          </div>
      </div>
       </div>
  )
}

export default Profile