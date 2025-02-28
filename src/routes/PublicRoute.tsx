import { Loader } from '@/components'
import { useAuth0 } from '@auth0/auth0-react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-screen h-screen'>
        <Loader />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
}

export default PublicRoute
