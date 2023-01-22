import { useEffect } from "react";

export default function useEvent(event, handler, passive=false){
    useEffect(() => {
        // passive = true
        if(passive)
        {
            return
        }
        else {
            window.addEventListener(event, handler, passive);
        }
        window.addEventListener(event, handler, passive);
        
    
        return function cleanUp(){
            window.removeEventListener(event, handler, passive);
        }
    })
}