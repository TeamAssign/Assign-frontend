import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isAuthenticated) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
}

export const ProtectedRoute = () => {
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
    return <div>Loading...</div>
  }

  // 인증되지 않은 사용자는 로그인으로 현재는 반대로
  if (!isAuthenticated) {
    return <Navigate to='/signin' replace />
  }

  // 현재 경로가 welcome인 경우 처리  현재는 반대로
  if (location.pathname === '/welcome') {
    if (!isFirstLogin) {
      return <Outlet />
    } else {
      return <Navigate to='/' replace />
    }
  }

  if (location.pathname !== '/welcome') {
    if (!isFirstLogin) {
      return <Navigate to='/welcome' replace />
    } else {
      return <Outlet />
    }
  }

  return <Outlet />
}
