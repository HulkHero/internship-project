export  function calulateRemainingTime(number:number):number {
    const currentDate = new Date();
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), number);
    
    // Check if the 15th has already passed this month
    if (currentDate.getDate() >= number) {
      targetDate.setMonth(targetDate.getMonth() + 1); // Move to next month
    }
    
    const timeRemaining:number = targetDate.getTime() - currentDate.getTime();
    return timeRemaining;
  }

