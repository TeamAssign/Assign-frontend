import Tooltip from '@/assets/icons/tooltip.svg?react'
interface PreferenceBarProps {
  price: string
  keyword: string[]
  accuracy: number
  accuracyBefore: number
}

const PreferenceBar = ({
  price,
  keyword,
  accuracy,
  accuracyBefore,
}: PreferenceBarProps) => {
  const accuracyIncrease = accuracy - accuracyBefore
  const isPositiveChange = accuracyIncrease >= 0

  return (
    <div className='w-full p-4 mb-4 bg-white rounded-lg shadow-md'>
      <div className='flex items-center justify-between mb-3'>
        <div className='flex-1'>
          <h3 className='font-bold text-gray-800 text-subbody'>선호도 분석</h3>
          <div className='flex flex-wrap items-center gap-2 p-1'>
            <span className='font-medium text-gray-700'>{price}</span>
            <div className='flex items-center gap-2'>
              <div className='flex flex-wrap gap-1'>
                {keyword.map((item: string, index: number) => (
                  <span
                    key={index}
                    className='bg-blue-100 text-blue-700 text-subbody px-2 py-0.5 rounded-full'
                  >
                    #{item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-end'>
          <div className='flex items-center gap-1'>
            <span className='text-2xl font-bold'>{accuracy.toFixed(1)}%</span>
            <div>
              <div className='relative group'>
                <Tooltip className='w-4 h-4 text-gray-500 cursor-pointer' />
                <div className='absolute right-0 invisible w-48 p-2 text-white bg-black rounded-lg text-subbody -top-10 group-hover:visible'>
                  사용자 선호도를 분석한 결과의 정확도를 나타냅니다.
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-center mt-1'>
            <span className='text-gray-500 text-subbody'>
              이전: {accuracyBefore.toFixed(1)}%
            </span>
            <span
              className={`ml-2 text-subbody ${
                isPositiveChange ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {isPositiveChange ? '+' : ''}
              {accuracyIncrease.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      <div className='w-full bg-gray-200 rounded-full h-2.5'>
        <div
          className='bg-sub h-2.5 rounded-full'
          style={{ width: `${accuracy}%` }}
        ></div>
      </div>
    </div>
  )
}

export default PreferenceBar
