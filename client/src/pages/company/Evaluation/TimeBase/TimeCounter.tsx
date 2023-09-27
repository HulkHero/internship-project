import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import {calulateRemainingTime }from '../../../../utils/remainingTime';
import CountDownUi from '../../../../components/CountDownUi';
interface Props{
  time:number
}

const TimeCounter = ({time}:Props) => {
  const [timeRemaining, setTimeRemaining] = React.useState<number>(calulateRemainingTime(time)); 

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calulateRemainingTime(time));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeRemaining]);

  return (
    <>
    {
      timeRemaining>0? 
       <CountDownUi days={days} hours={hours} minutes={minutes} seconds={seconds}></CountDownUi>
    : <div>
      Evaluation Open
      </div>}
    </>
  )
}

export default TimeCounter