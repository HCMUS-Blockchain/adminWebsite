import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export interface DoughnutChartInterface {
  result: Array<number>
}
export function DoughnutChart({ result }: DoughnutChartInterface) {
  const [data, setData] = useState({
    labels: ['Tile 2048', 'Jump', 'Dr Strange', 'Shake'],
    datasets: [
      {
        label: 'Total turns',
        data: [0, 0, 0, 0],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  })

  useEffect(() => {
    if (result) {
      const datasets = [
        {
          label: 'Total turns',
          data: result,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ]
      setData({ ...data, datasets: datasets })
    }
  }, [result])
  return <Doughnut data={data} width="450" />
}
