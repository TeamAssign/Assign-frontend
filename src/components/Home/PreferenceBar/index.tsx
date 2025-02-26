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
          <h3 className='text-lg font-bold text-gray-800'>선호도 분석</h3>
          <div className='flex items-center gap-2 mt-1'>
            <span className='font-medium text-gray-700'>{price}</span>
            <span className='w-1 h-1 bg-gray-400 rounded-full'></span>
            <div className='flex flex-wrap gap-1'>
              {keyword.map((item: string, index: number) => (
                <span
                  key={index}
                  className='bg-blue-100 text-blue-700 text-sm px-2 py-0.5 rounded-full'
                >
                  #{item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className='flex flex-col items-end'>
          <div className='flex items-center gap-1'>
            <span className='text-2xl font-bold'>{accuracy.toFixed(1)}%</span>
          </div>
          <div className='flex items-center mt-1'>
            <span className='text-sm text-gray-500'>
              이전: {accuracyBefore.toFixed(1)}%
            </span>
            <span
              className={`ml-2 text-sm ${
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
          className='bg-blue-600 h-2.5 rounded-full'
          style={{ width: `${accuracy}%` }}
        ></div>
      </div>
    </div>
  )
}

export default PreferenceBar
