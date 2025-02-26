import { MenuStoreValues } from '@/types'

const StoreCard = ({
  placeUrl,
  imageUrl,
  placeName,
  roadAddressName,
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
          alt={`${placeName} 이미지`}
          className='w-full h-28 object-cover'
        />
      </div>
      <div className='px-2 py-2 flex flex-col'>
        <span className='text-sm font-semibold truncate'>{placeName}</span>
        <span className='text-xs text-gray-500 truncate'>
          {roadAddressName}
        </span>
        <span className='text-xs text-gray-400'>근처 {distance}m</span>
      </div>
    </a>
  )
}

export default StoreCard
