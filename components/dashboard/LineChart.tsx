import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Voucher',
    },
  },
}

var now = new Date()
var daysOfYear = []
for (var d = new Date(2022, 11, 28); d <= now; d.setDate(d.getDate() + 1)) {
  daysOfYear.push(new Date(d).toLocaleDateString('en-US'))
}
console.log(daysOfYear)

export const data = {
  labels: daysOfYear,
  datasets: [
    {
      label: 'Release Voucher',
      data: [12, 24, 54, 34, 67, 90, 23, 12],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Used Voucher',
      data: [100, 42, 56, 78, 90, 99, 10, 33],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

export function LineChart() {
  return <Line options={options} data={data} />
}
