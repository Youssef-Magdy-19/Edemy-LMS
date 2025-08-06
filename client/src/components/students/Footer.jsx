import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-900' >
      <div className='container' style={{ padding: '20px 0' }}>
        <div className=' text-white justify-between flex flex-col md:flex-row gap-6 md:gap-15'>
          <div className="flex flex-col items-center md:items-start">
            <img src={assets.logo_dark} alt="" className='w-22 h-7' style={{ marginLeft:'-5px' }} />
            <p className='md:w-30 text-sm text-center md:text-left text-white/80' style={{ marginTop: '10px' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
          </div>
          <div className='flex flex-col gap-3'>
            <h3 className='font-semibold  text-center md:text-left' style={{ marginTop: '5px' }}>Company</h3>
            <ul className='flex md:flex-col gap-3 md:gap-2  items-between justify-between text-sm md:text-base text-white/80 md:justify-center text-center sm:text-left'>
              <li className='text-sm'><Link to='/'>Home</Link></li>
              <li className='text-sm'><Link to='/my-enrollments'>My Enrollments</Link></li>
              <li className='text-sm'><Link to='/course-list'>Courses List</Link></li>
              <li className='text-sm'><Link to=''>Contact us</Link></li>
            </ul>
          </div>
          <div className='hidden md:block'>
            <h3 className='font-semibold' style={{ marginBottom: '15px', marginTop: '5px' }}>Sybscribe to out Newsletter</h3>
            <p className='text-white/80 text-sm '>The latest news, articles, and resources, sent to your inbox weekly.</p>
            <div className="flex gap-2" style={{marginTop:'12.5px'}}>
              <input type="email"
                placeholder='Enter your Email'
                className='outline-none border-1 border-gray-500/30 rounded text-gray-500 bg-gray-800 placeholder-gray-500 text-sm md:text-base'
                style={{ padding: '5px 10px' }}
              />
              <button className='rounded bg-blue-500' style={{ padding: '5px 10px' }}>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div className='line border-1 border-white/40' style={{margin:'auto' , width:'85%'}}></div>
      <p className='text-center text-white/60 text-xs md:text-sm' style={{padding:'10px 0 12px 0'}}>Copyright 2025 © Eng.Youssef Magdy. All Right Reserved.</p>
    </footer>
  )
}

export default Footer
