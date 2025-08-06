import { assets } from '../../assets/assets'
import React from 'react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <div className='action' style={{ padding: "1.5rem 2rem 4rem 2rem", width: "85%", margin: 'auto' }}>
      <h2 className='font-medium text-gray-800 text-3xl text-center'>Learn anything, anytime, anywhere</h2>
      <p className='text-gray-500 text-sm md:text-base  text-center' style={{ marginTop: '20px' }}>Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.</p>
      <div className="flex gap-5 justify-center" style={{margin:'15px 0'}}>
        <Link to='/course-list' className='bg-blue-500 rounded text-white' style={{padding:"7px 15px"}}>Get Started</Link>
        <Link to='' className='flex items-center gap-2'>Learn more <img src={assets.arrow_icon} className='h-4 w-4' /></Link>
      </div>
    </div>
  )
}

export default CallToAction
