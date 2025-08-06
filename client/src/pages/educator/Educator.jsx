import Sidebar from '../../components/educator/Sidebar'
import EduNavbar from '../../components/educator/EduNavbar'
import React from 'react'
import { Outlet } from 'react-router-dom'
import useWindowScrollToTop from '../../hooks/useWindowScrollToTop'

const Educator = () => {
  useWindowScrollToTop()
  return (
    <div className='educator flex gap-2' style={{marginTop:'60px',}}>
      <Sidebar />
      <div>{<Outlet/>}</div>
    </div>
  )
}

export default Educator
