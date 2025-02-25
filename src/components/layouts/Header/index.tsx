import BackIcon from '@/assets/icons/arrow-back-icon.svg?react'
import { PATH_VALUE } from '@/constant'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPathname = location.pathname

  const headerContent = PATH_VALUE.find((item) => {
    if (item.path === '/') return item.path === currentPathname
    if (item.path === '/teams') return currentPathname.startsWith('/teams')
    return item.path === currentPathname
  })

  const goBack = () => {
    navigate(-1)
  }

  return (
    <header className='fixed top-0 z-50 w-full max-w-[600px] p-3 h-14 bg-main'>
      <div className='flex items-center gap-4 h-full w-full'>
        {headerContent?.path !== '/' && (
          <BackIcon onClick={goBack} className='cursor-pointer rounded-full' />
        )}
        <span className='text-white text-title font-bold'>
          {headerContent?.value}
        </span>
      </div>
    </header>
  )
}

export default Header
