import { useState, useEffect } from 'react';

export default function Timer({isActive, setIsActive, initialCounter, resetTimer}) {
  const [counter, setCounter] = useState(initialCounter);

  useEffect(() => {
    let intervalId;
    
    // If active and time left then start interval to decrement timer by 1 second
    if (isActive && counter > 0) {
      intervalId = setInterval(() => {
        setCounter(prevCounter => prevCounter - 1);
      }, 1000);
    } 
    // If counter is 0 then player is no longer active and movement should stop
    else if (counter <= 0) {
      setIsActive();
    }

    // Cleanup function to clear interval when component unmounts or dependency changes
    return () => clearInterval(intervalId);
  }, [isActive, counter, setIsActive]);

  useEffect(() => {
   if(resetTimer)
   {
      setCounter(initialCounter);
   }
 }, [resetTimer]);

  return (
    <div>{counter}</div>
  );
}
