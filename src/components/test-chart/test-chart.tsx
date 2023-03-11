import React from 'react'
import useSWR from 'swr'
import style from './TestChart.module.scss'
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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'GM Reactions',
    },
  },
}
const fetcher = (url: any) => fetch(url).then((r) => r.json())

export function TestChart() {
  const { data, error, isLoading } = useSWR('/api/stats', fetcher)

  if (isLoading) {
    return (
      <>
        <section>
          <div className={style.loading + ' ' + style.loading08}>
            <span data-text="L">L</span>
            <span data-text="O">O</span>
            <span data-text="A">A</span>
            <span data-text="D">D</span>
            <span data-text="I">I</span>
            <span data-text="N">N</span>
            <span data-text="G">G</span>
          </div>
        </section>
      </>
    )
  }

  let parseData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Reactions',
        data: Object.values(data).map((x) => Number(x)),
        backgroundColor: 'rgba(45, 85, 255, 0.5)',
      },
    ],
  }
  return (
    <>
      <div className={style.container}>
        <div className={style.parent}>
          <Bar className={style.reactions} options={options} data={parseData} />
        </div>
        <div className={style.parent}>
          <Bar className={style.test} options={options} data={parseData} />
        </div>
      </div>
    </>
  )
}
