import Sidebar from '../../components/educator/Sidebar'
import { Outlet } from 'react-router-dom'
import useWindowScrollToTop from '../../hooks/useWindowScrollToTop'

const Educator = () => {
  useWindowScrollToTop()
  return (
    <div className='educator flex gap-2' style={{marginTop:'60px',}}>
      <Sidebar />
      <div className='w-[83%] md:w-[70%] lg:w-[80%]'>{<Outlet/>}</div>
    </div>
  )
}

export default Educator
