import { setTokenProvider } from '@/apis/interceptors'
import queryClient from '@/apis/queryClient'
import { Routes } from '@/routes'
import '@/styles/global.css'
import { useAuth0 } from '@auth0/auth0-react'
import { QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'

const App = () => {
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    setTokenProvider(() => getAccessTokenSilently())
  }, [getAccessTokenSilently])

  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  )
}

export default App
