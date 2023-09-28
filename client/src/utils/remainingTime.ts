export  function calulateRemainingTime(number:number):number {
    const currentDate = new Date();
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), number);
    
    if (currentDate.getDate() >= number) {
      targetDate.setMonth(targetDate.getMonth() + 1); 
    }
    
    const timeRemaining:number = targetDate.getTime() - currentDate.getTime();
    return timeRemaining;
  }

