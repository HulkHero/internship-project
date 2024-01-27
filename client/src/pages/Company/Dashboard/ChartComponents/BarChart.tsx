import React from 'react'
import { Evaluation, Kpis } from '../types'
import { Bar } from 'react-chartjs-2'
import {Chart as ChartJs,
BarElement,
PointElement,
Tooltip,
Legend,
CategoryScale,
LinearScale,

ChartDataset
} from 'chart.js'

ChartJs.register(BarElement,PointElement,CategoryScale,LinearScale,Tooltip,Legend)


type Props = {
    evaluation:Evaluation[]
}

const BarChart = ({evaluation}: Props) => {
  const evaluation2=evaluation.sort((a,b)=>new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime())
  console.log(evaluation2,"evaluation2")
  const score=evaluation2.map((evalu:Evaluation)=>evalu.score)
  const data={
     labels: evaluation2.map((evalu:Evaluation)=>evalu.createdAt.slice(0,10)),
    datasets: [{
      label:"Average Score",
      data: score,
      backgroundColor: backgroundColors,
      borderColor: borderColors,
      borderWidth: 1,
    }]
  } ;
 

  console.log(data,"chart")

  const options={
     maintainAspectRatio: false,
     responsive:true,

      scales:{
        y:{
            beginAtZero:true,
            max:100
        }
      }
  }


  return (
     <Bar data={data} className='w-full'  options={options}/>
  )
}

export default BarChart

const backgroundColors = [
    'rgba(255, 99, 132, 0.4)',   // Red
    'rgba(54, 162, 235, 0.4)',  // Blue
    'rgba(255, 206, 86, 0.4)',  // Yellow
    'rgba(75, 192, 192, 0.4)',  // Teal
    'rgba(153, 102, 255, 0.4)', // Purple
    'rgba(255, 159, 64, 0.4)',  // Orange
    'rgba(0, 128, 0, 0.4)',     // Green
    'rgba(255, 0, 255, 0.4)',   // Magenta
    'rgba(128, 128, 128, 0.4)', // Gray
    'rgba(0, 0, 255, 0.4)'      // Dark Blue
  ];
  
  const borderColors = [
    'rgba(255, 99, 132, 1)',    // Red
    'rgba(54, 162, 235, 1)',    // Blue
    'rgba(255, 206, 86, 1)',    // Yellow
    'rgba(75, 192, 192, 1)',    // Teal
    'rgba(153, 102, 255, 1)',   // Purple
    'rgba(255, 159, 64, 1)',    // Orange
    'rgba(0, 128, 0, 1)',       // Green
    'rgba(255, 0, 255, 1)',     // Magenta
    'rgba(128, 128, 128, 1)',   // Gray
    'rgba(0, 0, 255, 1)'        // Dark Blue
  ];
  