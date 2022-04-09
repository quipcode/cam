import React from "react"
import {useCam} from './useCam'

export function Cam(){
    const {cam, setCam, doubleCam} = useCam();

    return(
        <div>
            <p>Start time of Cam: {cam.startTime}</p>
            <button onClick={doubleCam}>Double the cam</button>
            <button onClick={()=> 
                setCam({
                    startTime: 1,
                    establishCam(){
                        console.log("reset")
                    }
                })
            }>
                reset Starttime of Cam
            </button>
        </div>
    )
}