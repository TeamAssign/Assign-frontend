import { Loader } from '@/components'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0()
  const [isFirstLogin, setIsFirstLogin] = useState<boolean | null>(null)
  const [checkingClaims, setCheckingClaims] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const checkFirstLoginStatus = async () => {
      if (isAuthenticated) {
        try {
          const claims = await getIdTokenClaims()
          const isFirstLoginClaim = claims?.['https://back-end/isFirstLogin']
          setIsFirstLogin(isFirstLoginClaim)
        } catch (error) {
          console.error('토큰 클레임 확인 중 오류 발생:', error)
          setIsFirstLogin(false)
        }
      }
      setCheckingClaims(false)
    }

    checkFirstLoginStatus()
  }, [isAuthenticated, getIdTokenClaims])

  if (isLoading || checkingClaims) {
    return (
      <div className='flex items-center justify-center w-screen h-screen'>
        <Loader />
      </div>
    )
  }

  if (isFirstLogin === null && isAuthenticated) {
    return (
      <div className='flex items-center justify-center w-screen h-screen'>
        <Loader />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to='/signin' replace />
  }

  if (location.pathname === '/welcome') {
    if (isFirstLogin) {
      return <Outlet />
    } else {
      return <Navigate to='/' replace />
    }
  }

  if (location.pathname !== '/welcome') {
    if (isFirstLogin) {
      return <Navigate to='/welcome' replace />
    } else {
      return <Outlet />
    }
  }

  return <Outlet />
}

export default ProtectedRoute
