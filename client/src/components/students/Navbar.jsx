import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const isCourseListPage = location.pathname.includes('/course-list')
  const { openSignIn } = useClerk()
  const { user } = useUser()
  const [isEducator , setIsEducator] = useState(true)
  return (
    <header className={`${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'} absolute w-full h-[60px] top-0 border-b border-b-gray-500 flex items-center justify-between`}>
      <div className="container">
        <div className="flex justify-between items-center w-full">
          <Link to='/'><img src={assets.logo} alt="" height={45} className='cursor-pointer' /></Link>
          <div className="hidden md:flex items-center gap-5">
            {user &&
              <>
                <Link className='text-gray-500' to='/educator'>{isEducator? 'Educator Dashboard' :'Become Educator'}</Link>
                <div style={{ height: "20px", width: "1px", backgroundColor: "grey" }}></div>
                <Link className='text-gray-500' to='/my-enrollments'>My Enrollments</Link>
              </>
            }
            {user ? <UserButton /> :
              <button className='bg-blue-500 text-white rounded-full cursor-pointer'
                style={{ padding: "5px 15px" }}
                onClick={() => openSignIn()}
              >
                Create Account
              </button>
            }
          </div>
          <div className='flex md:hidden items-center gap-3'>
            {user &&
              <>
                <Link className='text-gray-500' to='/educator' >{isEducator? 'Educator Dashboard' :'Become Educator'}</Link>
                <div style={{ height: "30px", width: "1px", backgroundColor: "grey" }}></div>
              </>
            }
            {user ? <UserButton /> : <button className='cursor-pointer' onClick={() => openSignIn()}><img src={assets.user_icon} alt="user-icon" /></button>}
          </div>
        </div>
      </div>

    </header>
  )
}

export default Navbar
