import { Header, NavBar } from '@/components'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex flex-col mx-auto min-h-screen max-w-[600px]'>
      <Header />
      <main className='w-full min-h-[calc(100vh-56px-64px)] py-14'>
        <section className='p-3'>
          <Outlet />
        </section>
      </main>
      <NavBar />
    </div>
  )
}

export default Layout
