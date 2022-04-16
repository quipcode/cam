import React, { useState, useEffect } from "react"
import { useCam } from './useCam'
import { CamData
} from './camReducer'

function CamForm() {
    const { cam, camForm, setCam, doubleCam, setCamForm } = useCam();
    
    // const [camFormState, setCamFormState] = useState("camForm.activityName");

    const [input, setInput] = useState<any>({ activityName: camForm.activityName})
    useEffect(()=>{
        // console.log("camform changed")
        // console.log(camForm)
        // console.log(input) 
        setInput({ activityName: camForm.activityName
})
    }, [camForm])

    const handleInputChange = (e: any) => setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value
    })
     console.log(camForm) 
     console.log(input) 
function millisecondsStringToHourMinute(milliString: number){
    //@ts-ignore
    let milliNum = parseInt(milliString)
    var date = new Date(milliNum);
    let options = {hourCycle: 'h23', hour: '2-digit', minute: '2-digit'}
    return milliString ? date.toLocaleString('en-US', {hourCycle: 'h23', hour: '2-digit', minute: '2-digit'}) : ""; 
}
    return (
        <div>
            
            <h3>Cam Form</h3>

            <form onSubmit={(e) => {
                e.preventDefault()
                console.log("in camForm submit")
                //@ts-ignore
                console.log(e.target.elements)
                const form = e.target;
                // get the field that you want
                // //@ts-ignore
                // const userName = form.elements['userName'].value
                // //@ts-ignore
                // const activityId = form.elements['activityId'].value
                //@ts-ignore
                // const activityName = form.elements['activityName'].value;
                const activityName = input.activityName
                //@ts-ignore
                const startTime = form.elements['startTime'].value;
                //@ts-ignore
                const endTime = form.elements['endTime'].value;
                //@ts-ignore
                const activityId = form.elements['activityId'].value;
                
                setCamForm({
                    activityId: activityId,
                    startTime: startTime,
                    endTime: endTime,
                    activityName: activityName,
                    duration: 0,
                    dayEnd: 0,
                    dayStart: 0
                    // establishCamForm() {
                    //     console.log("hi")
                    // }
                })
                console.log("setting activityname", activityName, cam)
            }
            }>

                {/* <label htmlFor='userName'>Username: </label>
                <input type="text" id='userName' name='userName' disabled /> <br />
                */}
                <label htmlFor='activityId'>Activity Id: </label>
                <input type="text" id='activityId' name='activityId' disabled value={camForm.activityId} /> <br />
                <label htmlFor='activityName'>Activity Name: </label>
                <input type="text" id='activityName' name='activityName' onChange={handleInputChange} value={input.activityName}/> <br />
                <label htmlFor="startTime">StartTime: </label>
                <input type="time" name='startTime' id='startTime' defaultValue={millisecondsStringToHourMinute(camForm.startTime)} /> <br />
                <label htmlFor="endTime" >EndTime: </label>
                <input type="time" name='endTime' id='endTime' defaultValue={millisecondsStringToHourMinute(camForm.endTime)} /> <br />

                <input type="submit" value="Submit" />
            </form>

            
            {/* <div>
                <p>startTime: {camForm.startTime}</p>
                <p>endTime: {camForm.endTime}</p>
                <p>activityName: {camForm.activityName}</p>
                <p>StarttimeCorrected: {millisecondsStringToHourMinute(camForm.startTime)}</p>
            </div> */}
        </div>
    )
}

export default CamForm;