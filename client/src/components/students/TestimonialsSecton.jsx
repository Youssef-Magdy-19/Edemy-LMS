import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'
import { Link } from 'react-router-dom'
const TestimonialsSecton = () => {
  return (
    <div className='Testimonials' style={{ padding: "1rem 2rem", width: "85%", margin: 'auto' }}>
      <h2 className='font-medium text-gray-800 text-3xl text-center'>Testimonials</h2>
      <p className='text-gray-500 text-sm md:text-base  text-center' style={{ marginTop: '20px' }}>Hear from our learners as they share their journeys of transformation, success, and how our <br /> platform has made a difference in their lives.</p>
      <div className="Testimonial grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ margin: "35px 0" }}>
        {dummyTestimonial.map((test) => {
          return (
            <div className='card border-1 border-gray-500/30 rounded-lg text-sm bg-white
             shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden' style={{paddingBottom:'2.5px'}}>
              <div className="head-card bg-gray-500/10 flex gap-3" style={{ padding: '15px' }}>
                <img src={test.image} alt="" className='w-13 h-13 rounded-full'/>
                <div>
                  <h1 className='text-lg font-medium text-gray-800'>{test.name}</h1>
                  <p className='text-gray-800/80'>{test.role}</p>
                </div>
              </div>
              <div className="body-card text-left" style={{ padding: '15px' }}>
                <div className='flex gap-.5 items-center'>
                  {[...Array(Math.floor(test.rating))].map((star, i) => <img key={i} src={assets.star} className='w-5 h-5' />)}
                  {[...Array(5 - Math.floor(test.rating))].map((star, i) => <img key={i} src={assets.star_blank} className='w-6 h-6' />)}
                </div>
                <p className='text-gray-500' style={{margin:'10px 0'}}>{test.feedback}</p>
                <a href="#" className='text-blue-500'>Read more</a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TestimonialsSecton
