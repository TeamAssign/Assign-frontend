/**
 * Header 컴포넌트
 * @description
 * 나중에 라우팅 연결 후 각 페이지에 따라 들어갈 내용 적용해서 추가 작업을 할 예정입니다.
 */

const Header = () => {
  return (
    <header className='fixed top-0 z-50 w-full max-w-[600px] p-3 h-14 bg-main'>
      <div className='flex items-center justify-between h-full w-full'>
        <span className='text-white text-title font-bold'>점심 뭐먹지?</span>
      </div>
    </header>
  )
}

export default Header
