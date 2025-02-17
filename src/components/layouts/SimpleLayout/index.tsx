import { Outlet } from 'react-router-dom'

const SimpleLayout = () => {
  return (
    <div className='flex flex-col mx-auto min-h-screen max-w-[600px]'>
      <Outlet />
    </div>
  )
}

export default SimpleLayout
