import { assets } from '../../assets/assets'
import React from 'react'

const Companies = () => {
  return (
    <div className='Companies container ' style={{marginBottom : "10px",paddingTop:'20px'}}>
      <div className='flex flex-col gap-5 md:gap-6 text-center' style={{width:"90%" , margin:'auto'}}>
      <p className='text-gray-500'>Trusted by learners from</p>
      <div className="Companies-images flex gap-6 md:gap-12 justify-between items-center flex-wrap">
        <img src={assets.microsoft_logo} alt="" className='w-21 md:w-28' />
        <img src={assets.walmart_logo} alt="" className='w-20 md:w-28' />
        <img src={assets.accenture_logo} alt="" className='w-20 md:w-28' />
        <img src={assets.adobe_logo} alt="" className='w-20 md:w-28' />
        <img src={assets.paypal_logo} alt="" className='w-20 md:w-28' />
      </div>
      </div>
    </div>
  )
}

export default Companies
