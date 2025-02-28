import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CardSkeleton = () => {
  return (
    <div className='flex w-full gap-6 p-4'>
      <div className='w-3/5 h-20'>
        <Skeleton height='100%' width='100%' borderRadius='0.5rem' />
      </div>
      <div className='flex flex-col w-full gap-2'>
        <div className='flex flex-col gap-1.5'>
          <Skeleton width='100%' height={20} />
          <Skeleton width='100%' height={20} />
          <Skeleton width='100%' height={20} />
        </div>
      </div>
    </div>
  )
}

export default CardSkeleton
