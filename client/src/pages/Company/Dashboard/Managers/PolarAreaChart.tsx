import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axiosInstance from '../../../../utils/interceptor'
import { PolarArea } from 'react-chartjs-2'
import {Chart as ChartJs,
    ArcElement,
    PointElement,
    Tooltip,
    Legend,

    } from 'chart.js'
import { Project } from './types'
interface Props {
    data:Project[]
}  





ChartJs.register(ArcElement,PointElement,Tooltip,Legend)
    

const PolarAreaChart = ({data}:Props) => {

    const chartData ={
        labels:data.map((project:Project)=>project.projectName),
        datasets:[{
            label:'members',
            data:data.map((project:Project)=>project.employeesSize),
            backgroundColor: backgroundColors,
      borderColor: borderColors,
      borderWidth: 1,
   
        }]
    }

    const options={
        maintainAspectRatio: false,
        responsive:true,     
     }
     




  return (
      <>

      {<PolarArea data={chartData} className='w-full' options={options}/>}
      </>

  )
}

export default PolarAreaChart


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
  