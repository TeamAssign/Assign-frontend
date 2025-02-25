import { PieChart } from '@/components'

const Home = () => {
  return (
    <div className='p-4'>   
      <h2 className="mb-1 text-xl font-bold">음식 선호도</h2>
        <p className="mb-4 text-gray-600">직원들이 가장 선호하는 음식 종류는 무엇일까요?</p>
        {/* 차트 컨테이너: 너비 70%, 높이 400px, 가운데 정렬 */}
        <PieChart />
    </div>
  )
}

export default Home
