import React from 'react'
import { Evaluation, Kpis } from '../types'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJs,
LineElement,
PointElement,
Tooltip,
CategoryScale,
LinearScale,
Legend,

} from 'chart.js'

ChartJs.register(LineElement,PointElement,Tooltip,Legend,CategoryScale,LinearScale)


type Props = {
    evaluation:Evaluation[]
}

const LineChart = ({evaluation}: Props) => {
    const evaluation2=evaluation.sort((a,b)=>new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime())
  
  const data={
    labels: evaluation2.map((evalu:Evaluation)=>evalu.createdAt.slice(0,10)),
    datasets: evaluation2[0].kpis.map((kpi: Kpis, index) => {
        return {
          label: kpi.kpiName, 
          data: evaluation2.map((evalu: Evaluation) => evalu.kpis[index].kpiScore),
            backgroundColor: backgroundColors[index],
            borderColor: borderColors[index],
            pointBackgroundColor: backgroundColors[index],
            pointBorderColor:borderColors[index],
            pointHoverBackgroundColor:backgroundColors[index],
            pointHoverBorderColor:borderColors[index], 
            tension:0.3
        }
    })
  }


  const options={
     maintainAspectRatio: false,
     responsive:true,

     scales:{
        y:{
            beginAtZero:false,
        }
     }
    

    }

  


  return (
     <Line data={data} className='w-full'  options={options}/>
  )
}

export default LineChart

const backgroundColors = [
    'rgba(255, 99, 132, 0.2)',   // Red
    'rgba(54, 162, 235, 0.2)',  // Blue
    'rgba(255, 206, 86, 0.2)',  // Yellow
    'rgba(75, 192, 192, 0.2)',  // Teal
    'rgba(153, 102, 255, 0.2)', // Purple
    'rgba(255, 159, 64, 0.2)',  // Orange
    'rgba(0, 128, 0, 0.2)',     // Green
    'rgba(255, 0, 255, 0.2)',   // Magenta
    'rgba(128, 128, 128, 0.2)', // Gray
    'rgba(0, 0, 255, 0.2)'      // Dark Blue
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
  