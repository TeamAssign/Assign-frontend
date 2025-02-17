import HistoryIcon from '@/assets/icons/HistoryIcon.svg?react'
import HomeIcon from '@/assets/icons/HomeIcon.svg?react'
import TeamIcon from '@/assets/icons/TeamIcon.svg?react'
import UserIcon from '@/assets/icons/UserIcon.svg?react'
import { Link } from 'react-router-dom'

/**
 * NavBar 컴포넌트
 * @description
 * TODO: 페이지 이동 시 색상 변경
 */

const NavBar = () => {
  return (
    <div className='fixed bottom-0 w-full z-50 max-w-[600px] border-t-[1px] bg-white border-gray-200 p-3 h-16'>
      <ul className='flex w-full h-full items-center justify-between text-subbody text-[#666666]'>
        <li>
          <Link className='flex flex-col items-center gap-1 p-1' to='/'>
            <HomeIcon />
            <span>홈</span>
          </Link>
        </li>

        <li>
          <Link
            className='flex flex-col items-center gap-1 p-1'
            to='/teams/3141341'
          >
            <TeamIcon />
            <span>팀 피드</span>
          </Link>
        </li>
        <li>
          <Link className='flex flex-col items-center gap-1 p-1' to='history'>
            <HistoryIcon />
            <span>히스토리</span>
          </Link>
        </li>
        <li>
          <Link className='flex flex-col items-center gap-1 p-1' to='/my'>
            <UserIcon />
            <span>개인 피드</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBar
