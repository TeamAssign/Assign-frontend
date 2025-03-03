import NoResultIcon from '@/assets/icons/no-result.svg?react'

const NoResult = () => {
  return (
    <section className='flex flex-col border-[1px] border-light-gray gap-2 rounded-xl items-center justify-center w-full py-4'>
      <h1 className='font-semibold text-dark-gray text-body'>
        검색 결과가 없습니다!
      </h1>
      <NoResultIcon />
    </section>
  )
}

export default NoResult
