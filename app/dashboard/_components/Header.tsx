import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className='p-3 shadow-sm border-b-2 bg-white flex justify-between items-center'>
      <div className='flex gap-2 items-center
       p-2 border rounded-md max-w-lg bg-white'>
        <Search/>
        <input type='text' placeholder='Search...'
        className='outline-none'
        />
      </div>
      <div className='flex gap-5 items-center'>

      <UserButton/>
      </div>
    </div>
  )
}

export default Header