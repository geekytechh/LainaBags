import React from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='flex items-center px-6 md:px-8 py-4 justify-between border-b border-blue-100 shadow-soft bg-white text-blue-700'>
      <div className='flex items-center gap-2'>
        <Image onClick={()=>router.push('/')} className='w-32 lg:w-40 cursor-pointer' src={assets.logo} alt="Search Bags Logo" />
      </div>
      <button className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm font-body shadow-soft hover:shadow-hover transition-all duration-300'>Logout</button>
    </div>
  )
}

export default Navbar