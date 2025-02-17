import { Header, NavBar } from '@/components'

interface LayoutProps {
  children: React.ReactNode
}

/**
 * Layout 컴포넌트
 * @description
 * 레이아웃을 잡기 위한 컴포넌트입니다 . 추후 라우팅 연결 후 Outlet으로 변경 예정입니다.
 */

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col mx-auto min-h-screen max-w-[600px]'>
      <Header />
      <main className='w-full min-h-[calc(100vh-56px-64px)] py-14'>
        <section className='p-3'>{children}</section>
      </main>
      <NavBar />
    </div>
  )
}

export default Layout
