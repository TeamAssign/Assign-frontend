import queryClient from '@/apis/queryClient'
import { Routes } from '@/routes'
import '@/styles/global.css'
import { QueryClientProvider } from '@tanstack/react-query'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  )
}

export default App
