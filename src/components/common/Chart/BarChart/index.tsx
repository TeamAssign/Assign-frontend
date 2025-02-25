import { BAR_BACKGROUND_COLORS, BAR_BORDER_COLORS } from '@/constant'
import { ChartValues } from '@/types'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  TooltipItem,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

interface BarChartProps {
  menu: ChartValues
}

const BarChart = ({ menu }: BarChartProps) => {
  const barChartData = {
    labels: Object.keys(menu),
    datasets: [
      {
        label: '팀에서 많이 먹은 TOP5 음식',
        data: Object.values(menu),
        backgroundColor: BAR_BACKGROUND_COLORS.map((color) => color),
        borderColor: BAR_BORDER_COLORS.map((color) => color),
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  }

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        onClick: () => {},
        labels: {
          boxWidth: 0,
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems: TooltipItem<'bar'>[]) => {
            return tooltipItems[0].label
          },
          label: (tooltipItem: TooltipItem<'bar'>) => {
            return `${tooltipItem.raw}`
          },
        },
      },
    },
  }
  return <Bar data={barChartData} options={barOptions} />
}

export default BarChart
