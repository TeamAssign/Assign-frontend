import { Avatar } from '@/components/index'

interface SelectBarProps {
  imgUrl: string
  name: string
  department: string
  text: string
  id: number
  onClick: (id: number) => void
  isSelected?: boolean // 선택 상태를 나타내는 prop 추가
}

/**
 * SelectBar 컴포넌트 - 사용자 선택을 위한 체크박스가 포함된 UI 바
 *
 * @param {object} props
 * @param {string} props.imgUrl - 사용자 프로필 이미지 URL
 * @param {string} props.name - 사용자 이름
 * @param {string} props.department - 사용자 부서명
 * @param {string} props.text - 이미지가 없을 경우 표시될 대체 텍스트
 * @param {number} props.id - 사용자 ID
 * @param {function} props.onClick - ID를 인자로 받는 클릭 핸들러 함수
 * @param {boolean} [props.isSelected] - 체크박스 선택 상태 (기본값: false)
 *
 * @example
 * const UserSelectionSection = () => {
 *   const [selectedUsers, setSelectedUsers] = useState([])
 *
 *   const handleUserSelect = (userId) => {
 *     // 사용자 선택 로직
 *     if (selectedUsers.includes(userId)) {
 *       setSelectedUsers(selectedUsers.filter(id => id !== userId))
 *     } else {
 *       setSelectedUsers([...selectedUsers, userId])
 *     }
 *   }
 *
 *   return (
 *     <div className="user-selection-container">
 *       {users.map(user => (
 *         <SelectBar
 *           key={user.id}
 *           id={user.id}
 *           imgUrl={user.profileImage}
 *           name={user.fullName}
 *           department={user.departmentName}
 *           text={user.initials}
 *           onClick={handleUserSelect}
 *           isSelected={selectedUsers.includes(user.id)}
 *         />
 *       ))}
 *     </div>
 *   )
 * }
 *
 * 렌더링 결과:
 * - 사용자 아바타(이미지 또는 텍스트), 이름, 부서가 함께 표시됨
 * - 각 항목은 하단 경계선으로 구분됨
 * - 전체 영역 클릭 시 체크박스 토글 가능
 */

const SelectBar = ({
  imgUrl,
  name,
  department,
  text,
  id,
  onClick,
  isSelected = false,
}: SelectBarProps) => {
  const handleClick = (e: React.MouseEvent) => {
    onClick(id)
    e.stopPropagation()
    console.log('clicked')
  }
  return (
    <div
      className='flex items-center justify-between py-2 border-b border-gray-200'
      onClick={handleClick}
    >
      <div className='flex items-center gap-2'>
        <Avatar imgUrl={imgUrl} text={text} />
        <div className='font-semibold'>{name}</div>
        <div className='text-gray-500'>{department}</div>
      </div>
      <input
        type='checkbox'
        checked={isSelected}
        onClick={handleClick}
        onChange={() => {}}
      />
    </div>
  )
}

export default SelectBar
