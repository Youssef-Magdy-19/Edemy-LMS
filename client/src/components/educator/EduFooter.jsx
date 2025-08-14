import { assets } from '../../assets/assets'

const EduFooter = () => {
  return (
    <footer className='w-full flex flex-col-reverse md:flex-row md:justify-between md:items-center border-t border-t-gray-300' style={{padding:"5px 20px"}}>
      <div className='flex gap-3 items-center relative m-auto w-full'>
        <img src={assets.logo} alt="" className='edufooter-img w-20'/>
        <div className='hidden md:block h-7 border-r border-gray-500/60'></div>
        <p className='text-gray-500 text-xs md:text-sm w-full text-center md:text-left'>Copyright 2025 © Eng.Youssef Magdy. All Right Reserved.</p>
      </div>
      <div className="flex gap-2 items-center justify-end">
        <a href='' className='cursor-pointer flex items-center justify-center'>
          <img src={assets.facebook_icon} alt="" className='w-8 h-8' />
        </a>
        <a href='' className='cursor-pointer flex items-center justify-center'>
          <img src={assets.twitter_icon} alt="" className='w-8 h-8' />
        </a>
        <a href='' className='cursor-pointer flex items-center justify-center '>
          <img src={assets.instagram_icon} alt="" className='w-8 h-8' />
        </a>
      </div>
    </footer>
  )
}

export default EduFooter
