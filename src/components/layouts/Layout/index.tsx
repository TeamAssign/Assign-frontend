import { Header, NavBar } from '@/components'
import { Outlet } from 'react-router-dom'

/**
 * Layout 컴포넌트
 * @description
 * 레이아웃을 잡기 위한 컴포넌트입니다 .
 */

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
