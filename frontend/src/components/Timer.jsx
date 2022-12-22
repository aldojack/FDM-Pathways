import { useState, useEffect } from 'react';

export default function Timer({isActive, setIsActive}) {
    const [counter, setCounter] = useState(10);


    function toggle() {
        setIsActive(!isActive);
      }

      useEffect(() => {

         if(isActive && counter >0){
            setTimeout(() => {
                setCounter(prevCounter => prevCounter - 1)
            }, 1000)
         } else if(!isActive && counter <=0){
            setIsActive(false)
            setCounter(10)
         }
         else if(isActive)
         {
            setIsActive(false)
            setCounter(10);
         }
     }, [isActive, counter]);
    
  return (
    <>
        <div>{counter}</div>
    </>
  )
}
