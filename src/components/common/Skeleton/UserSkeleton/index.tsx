import Skeleton from 'react-loading-skeleton'

const UserSkeleton = () => {
  return (
    <div className='w-full flex items-center gap-4 py-2 border-b border-gray-200'>
      <Skeleton circle width={32} height={32} />
      <div className='w-full'>
        <Skeleton width='100%' height={20} />
      </div>
    </div>
  )
}

export default UserSkeleton
