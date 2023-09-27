import React from 'react'
import FlipBox from './FlipBox'
import dashimg from '../../assets/dashimg.jpg'
import projectimg from '../../assets/projectimg.jpg'
import timeimg from '../../assets/timeimg.jpg'
import kpisimg from '../../assets/kpisimg.jpg'
const Features = () => {
  return (
    <div className='my-20'>
        <div>
            <h1 className='text-4xl font-bold text-center'>Features</h1>
        </div>
        <div className=' mt-14 flex flex-row flex-wrap gap-5 items-center justify-center'>
            <FlipBox caption="Dashboard" text="Interactive dashboard, has feature like search and filter which make analysis easy " image={dashimg}></FlipBox>
            <FlipBox caption="Project Base Evaluation" text="Add projects and teams, evaluate employee after the project completion" image={projectimg}></FlipBox>
            <FlipBox caption="Time Base Evaluation" text="Evaluate employees on every 15th and 30th of each month,to measure there recent performances" image={timeimg}></FlipBox>
            <FlipBox caption="Custom Kpis" text="Create your own key performance indicators to assess your employees accurately and according to your own parameters " image={kpisimg}></FlipBox>
            <FlipBox caption="Dynamic Roles" text="Create your own role and its kpi schema,we dont care you create a developer or accoutant role" image={kpisimg}></FlipBox>
            <FlipBox caption="Chat" text="Create your own role and its kpi schema,we dont care you create a developer or accoutant role" image={kpisimg}></FlipBox>
         </div>   

    </div>
  )
}

export default Features