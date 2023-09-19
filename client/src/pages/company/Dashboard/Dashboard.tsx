import React from 'react'
import Stats from './Stats'
import Bar from './Bar'

const Dashboard = () => {
  return (
    <div>
      <div>
        <Stats></Stats>  
      </div>
      <div>
        <Bar></Bar>
      </div>
    </div>
  )
}

export default Dashboard