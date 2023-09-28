import React from 'react'
import { Evaluation, Kpis } from '../types'
import { Doughnut } from 'react-chartjs-2'
import {Chart as ChartJs,
ArcElement,
PointElement,
Tooltip,
Legend,
ChartData,
ChartDataset
} from 'chart.js'

ChartJs.register(ArcElement,PointElement,Tooltip,Legend)


type Props = {
    evaluation:Evaluation[]
}

const DonutChart = ({evaluation}: Props) => {

  const score=evaluation.filter((evalu:Evaluation)=>evalu.score>evalu.threshold)
  const data={
     labels:["Score more than threshold","Below Threshold"],
    datasets: [{
      label:"Score",
      data: [score.length,evaluation.length-score.length],
      backgroundColor: backgroundColors,
      borderColor: borderColors,
      borderWidth: 1,
   
    }]

  } ;
 

  console.log(data,"chart")

  const options={
     maintainAspectRatio: false,
     responsive:true,

     
  }


  return (
     <Doughnut data={data} className='w-full'  options={options}/>
  )
}

export default DonutChart

const backgroundColors = [
    'rgba(255, 99, 132, 0.6)',   // Red
    'rgba(54, 162, 235, 0.6)',  // Blue
    'rgba(255, 206, 86, 0.6)',  // Yellow
    'rgba(75, 192, 192, 0.6)',  // Teal
    'rgba(153, 102, 255, 0.6)', // Purple
    'rgba(255, 159, 64, 0.6)',  // Orange
    'rgba(0, 128, 0, 0.6)',     // Green
    'rgba(255, 0, 255, 0.6)',   // Magenta
    'rgba(128, 128, 128, 0.6)', // Gray
    'rgba(0, 0, 255, 0.6)'      // Dark Blue
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
  