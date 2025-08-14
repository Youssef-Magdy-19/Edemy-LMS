import { Link, useLocation } from 'react-router-dom'
import { assets } from '../../assets/assets'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'

const Sidebar = () => {
  const location = useLocation()
  const { isEducator } = useContext(AppContext)
  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Courses', path: '/educator/my-course', icon: assets.my_course_icon },
    { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ]
  return isEducator && (
    // في فكرتين للبار الجانبي نختار ما بينهم علي حسب لو في فوتر ولا لا والاتنين ينفعوا في كل الاحوال بس لتنفيذ فكره صحيحه يبقي تستخدم كل واحده في مكانها
    // footer => in className = min-h-screen , in file Educator make flex to father , push sidebar side component , and pop from app.jsx
    // Not footer => in className = 'absolute top-10 bottom-0 left-0 ' , in file Educator make width : calc(100% - widthSideBar) , marginLeft : widthSideBar , and push in app.jsx 
    <div className='w-[60px] md:w-[220px] border-r border-r-gray-300 text-base min-h-screen'>
      <nav className='w-full'>
        <ul style={{marginTop:'0px'}}>
          {menuItems.map((item, index) => {
            return (
              <li key={index}
                className={`${location.pathname == item.path ? 'bg-blue-50 border-r-blue-500 border-r-[4px] ' : 'bg-white hover:bg-gray-100/90'}`}
                style={{ width: '100%' }}
              >
                <Link to = {item.path} className='flex gap-2 items-center' style={{padding: '10px 20px',}}>
                  <img src={item.icon} className=' h-6 w-6' alt="" />
                  <p className='md:block hidden text-center'>{item.name}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
