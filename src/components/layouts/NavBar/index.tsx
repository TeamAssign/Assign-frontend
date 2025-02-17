import HistoryIcon from '@/assets/icons/HistoryIcon.svg?react'
import HomeIcon from '@/assets/icons/HomeIcon.svg?react'
import TeamIcon from '@/assets/icons/TeamIcon.svg?react'
import UserIcon from '@/assets/icons/UserIcon.svg?react'

/**
 * NavBar 컴포넌트
 * @description
 * NavBar 부분도 나중에 라우팅 연결하면 Link 를 통해 페이지 연결 예정입니다. 현재는 퍼블리싱만 해둔 상태입니다.
 */

const NavBar = () => {
  return (
    <div className='fixed bottom-0 w-full z-50 max-w-[600px] border-t-[1px] bg-white border-gray-200 p-3 h-16'>
      <ul className='flex w-full h-full items-center justify-between text-subbody text-[#666666]'>
        <li className='flex flex-col items-center gap-1 p-1'>
          <HomeIcon />
          <span>홈</span>
        </li>
        <li className='flex flex-col items-center gap-1 p-1'>
          <TeamIcon />
          <span>팀 피드</span>
        </li>
        <li className='flex flex-col items-center gap-1 p-1'>
          <HistoryIcon />
          <span>히스토리</span>
        </li>
        <li className='flex flex-col items-center gap-1 p-1'>
          <UserIcon />
          <span>개인 피드</span>
        </li>
      </ul>
    </div>
  )
}

export default NavBar
