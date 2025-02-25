import { FOOD_CATEGORIES, PIE_CHART_COLORS } from '@/constant'
import {
  ArcElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
} from 'chart.js'
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

type FoodPreferenceData = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string[]
    borderColor: string[]
    borderWidth: number
  }[]
}

type PieChartOptions = ChartOptions<'pie'> & {
  plugins: {
    datalabels: {
      color: string
      formatter: (value: number, context: Context) => string
      font: {
        weight: string
        size: number
      }
      anchor: string
      align: string
      offset: number
    }
  }
}

const data: FoodPreferenceData = {
  labels: FOOD_CATEGORIES.map((category) => category),
  datasets: [
    {
      label: '음식 선호도',
      data: [12, 19, 3, 5, 2, 3, 7, 4],
      backgroundColor: PIE_CHART_COLORS.map((color) => color),
      borderColor: PIE_CHART_COLORS.map((color) => color),
      borderWidth: 1,
    },
  ],
}

const options: PieChartOptions = {
  radius: '100%',
  plugins: {
    legend: {
      position: 'right',
      labels: {
        font: {
          size: 14,
        },
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.label || ''
          const value = context.raw !== undefined ? Number(context.raw) : 0
          const total = context.dataset.data.reduce(
            (acc, data) => Number(acc) + Number(data),
            0,
          )
          const percentage = Math.round((value * 100) / total)
          return `${label}: ${value}명 (${percentage}%)`
        },
      },
    },
    datalabels: {
      color: '#333',
      formatter: function (value: number, context: Context) {
        const total = context.dataset.data.reduce(
          (acc, data) => Number(acc) + Number(data),
          0,
        )
        const percentage = Math.round(Number(value * 100) / Number(total))
        return percentage + '%'
      },
      font: {
        weight: 'bold',
        size: 12,
      },
      anchor: 'end',
      align: 'start',
      offset: 10,
    },
  },
}

const PieChart = () => {
  return (
    <div className='text-center'>
      <div className='relative w-4/5 mx-auto md:w-3/4 lg:w-2/3 h-96'>
        <Pie data={data} options={options} />
      </div>
    </div>
  )
}

export default PieChart
