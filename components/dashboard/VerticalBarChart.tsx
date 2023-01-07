import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Discount percentage',
    },
  },
}
export interface VerticalBarChartInterface {
  result: any
}

export function VerticalBarChart({ result }: VerticalBarChartInterface) {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Percentage',
        data: [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  })
  useEffect(() => {
    if (result) {
      const temp = {
        labels: result[0],
        datasets: [
          {
            label: 'Percentage',
            data: result[1],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      }
      setData(temp)
    }
  }, [result])
  return <Bar options={options} data={data} height="450" width="550" />
}
