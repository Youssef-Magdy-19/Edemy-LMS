import { Link } from 'react-router-dom'
import { assets, dummyEducatorData } from '../../assets/assets'
import { UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'

const EduNavbar = () => {
  const {user} = useUser()
  return (
    <header className='absolute w-full h-[60px] top-0 border-b border-b-gray-300 flex items-center justify-between' style={{ zIndex:'1000'}}>
      <div className="flex justify-between items-center w-full" style={{padding: '0 20px'}}>
        <Link to='/'><img src={assets.logo} alt="" height={45} className='cursor-pointer' /></Link>
      
        <div className="flex items-center gap-4 text-gray-500 relative">
          <p>Hi! {user ? user.fullName : 'Developers'}</p>
          {user ? <UserButton /> : <img src={assets.profile_img} alt="" />}
          
        </div>
      </div>
    </header>
  )
}

export default EduNavbar
