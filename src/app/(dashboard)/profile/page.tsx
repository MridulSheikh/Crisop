import { UserAvatar } from '@/components/shared/UserAvatar'
import { Button } from '@/components/ui/button'
import { UpdateProfile } from '@/components/ui/profile/UpdateProfileModal'
import { Key, Pencil } from 'lucide-react'
import React from 'react'

const Profile = () => {
  return (
      <div className='w-full flex justify-between items-center'>
          <div className=' flex gap-x-5 items-center'>
              <UserAvatar userName='mridul sheikh' className=' size-20' />
              <div>
                <h1 className=' text-2xl'>Mridul Sheikh</h1>
                <p className=' mt-0.5 text-gray-600'>prince9nazir@gmail.com</p>
              </div>
          </div>
          <div className=' flex gap-x-2'>
               <UpdateProfile />
               <Button> <Key/> Change Password</Button>
          </div>
      </div>
  )
}

export default Profile