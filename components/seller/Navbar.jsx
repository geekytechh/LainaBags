import React from 'react'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'
import { LogOut } from 'lucide-react'

const Navbar = () => {
  const { router } = useAppContext()

  return (
    <div className='flex items-center px-6 md:px-8 py-4 justify-between border-b border-slate-200 bg-white shadow-sm'>
      <div className='flex items-center gap-3 cursor-pointer group' onClick={() => router.push('/')}>
        <div className="relative">
          <div className="absolute inset-0 bg-sky-100 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200 p-1.5">
            <Image 
              src="/images/search.png" 
              alt="Laina Bags Logo" 
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-black text-slate-900 leading-tight">Laina Bags</span>
          <span className="text-[9px] font-bold text-sky-600 uppercase tracking-wider">Seller Dashboard</span>
        </div>
      </div>
      <button className='flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300'>
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </div>
  )
}

export default Navbar
