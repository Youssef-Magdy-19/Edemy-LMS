import Hero from '../../components/students/Hero'
import Companies from '../../components/students/Companies'
import CoursesSetion from '../../components/students/CoursesSetion'
import TestimonialsSecton from '../../components/students/TestimonialsSecton'
import CallToAction from '../../components/students/CallToAction'
import useWindowScrollToTop from '../../hooks/useWindowScrollToTop'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'

const Home = () => {
  const {getToken} = useContext(AppContext)
  const token = getToken()
  useEffect(()=> console.log(token) , [])
  
  useWindowScrollToTop()
  return (
    <div className='Home'>
      <Hero />
      <Companies />
      <CoursesSetion />
      <TestimonialsSecton />
      <CallToAction />
    </div>
  )
}

export default Home
