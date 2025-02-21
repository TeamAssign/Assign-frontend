import AvatarComponents from '@/components/ui/avatarExam'

const { AvatarExam, AvatarFallback, AvatarImage } = AvatarComponents

interface AvatarProps {
  imgUrl: string
  text: string
  name?: string
  department?: string
}

/**
 * Avatar 컴포넌트 - 사용자 아바타를 표시하는 컴포넌트
 *
 * @param {object} props
 * @param {string} props.imgUrl - 프로필 이미지 URL
 * @param {string} props.text - 이미지 로드 실패 시 표시할 대체 텍스트 (보통 이니셜)
 * @param {string} [props.name] - 사용자 이름 (선택적)
 * @param {string} [props.department] - 사용자 부서 (선택적)
 *
 * @example
 * const UserProfile = () => {
 *   const userData = {
 *     profileImage: '/images/profile.jpg',
 *     initials: 'JD',
 *     fullName: '홍길동',
 *     team: '디자인팀'
 *   }
 *
 *   return (
 *     <Avatar
 *       imgUrl={userData.profileImage}
 *       text={userData.initials}
 *       name={userData.fullName}
 *       department={userData.team}
 *     />
 *   )
 * }
 *
 * 주요 기능:
 * - 이미지 로드 실패 시 대체 텍스트(fallback) 표시
 * - 선택적으로 이름과 부서 표시 가능
 * - 중앙 정렬된 세로 레이아웃
 */

const Avatar = ({ imgUrl, text, name, department }: AvatarProps) => {
  return (
    <div className='flex flex-col items-center justify-center max-w-18'>
      <AvatarExam>
        <AvatarImage src={imgUrl} />
        <AvatarFallback>{text}</AvatarFallback>
      </AvatarExam>
      {name && (
        <div className='pt-2 font-semibold text-center text-description'>
          {name}
        </div>
      )}
      {department && (
        <div className='text-gray-500 text-description'>{department}</div>
      )}
    </div>
  )
}

export default Avatar
