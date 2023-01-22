import { useState, useEffect } from 'react';

export default function Timer({isActive, setIsActive, counter, setCounter}) {


      useEffect(() => {
         //If active and time left then countdown timer will decrement by 1 second
         if(isActive && counter >0){
            setTimeout(() => {
                setCounter(prevCounter => prevCounter - 1)
            }, 1000)
         } 
         //If counter is 0 then player is no longer active and movement should stop
         else if(counter <=0){
            setIsActive(false)
         }
     }, [counter]);
    
  return (
    <>
        <div>{counter}</div>
    </>
  )
}
