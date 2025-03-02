import HistoryIcon from '@/assets/icons/HistoryIcon.svg?react'
import HomeIcon from '@/assets/icons/HomeIcon.svg?react'
import TeamIcon from '@/assets/icons/TeamIcon.svg?react'
import UserIcon from '@/assets/icons/UserIcon.svg?react'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/UserInfoStore'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {
  const location = useLocation()
  const currentPath = location.pathname
  const teamId = useUserStore((state) => state.teamId)

  const isActive = (path: string) => currentPath === path
  const isTeamActive = () => currentPath.startsWith('/teams')
  return (
    <div className='fixed bottom-0 w-full z-50 max-w-[600px] border-t-[1px] bg-white border-gray-200 p-3 h-16'>
      <ul className='flex w-full h-full items-center justify-between text-subbody text-[#666666]'>
        <li>
          <Link
            className={cn(
              'flex flex-col items-center gap-1 p-1',
              isActive('/') && 'text-main',
            )}
            to='/'
          >
            <HomeIcon className='fill-current' />
            <span>홈</span>
          </Link>
        </li>

        <li>
          <Link
            className={cn(
              'flex flex-col items-center gap-1 p-1',
              isTeamActive() && 'text-main',
            )}
            to={`/teams/${teamId}`}
          >
            <TeamIcon className='fill-current' />
            <span>팀 피드</span>
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              'flex flex-col items-center gap-1 p-1',
              isActive('/history') && 'text-main',
            )}
            to='/history'
          >
            <HistoryIcon className='fill-current' />
            <span>히스토리</span>
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              'flex flex-col items-center gap-1 p-1',
              isActive('/my') && 'text-main',
            )}
            to='/my'
          >
            <UserIcon className='fill-current' />
            <span>개인 피드</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBar
