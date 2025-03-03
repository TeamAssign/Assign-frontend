import { MenuStoreValues } from '@/types'

const StoreCard = ({
  placeUrl,
  imageUrl,
  name,
  address,
  distance,
}: MenuStoreValues) => {
  return (
    <a
      href={placeUrl}
      target='_blank'
      rel='noopener noreferrer'
      className='border border-light-gray rounded-lg bg-white shadow-md max-w-[250px] flex flex-col overflow-hidden'
    >
      <div>
        <img
          src={imageUrl}
          alt={`${name} 이미지`}
          className='object-cover w-full h-28'
        />
      </div>
      <div className='flex flex-col px-2 py-2'>
        <span className='font-semibold truncate text-subbody'>{name}</span>
        <span className='text-gray-500 truncate text-description'>
          {address}
        </span>
        <span className='text-gray-400 text-description'>근처 {distance}m</span>
      </div>
    </a>
  )
}

export default StoreCard
