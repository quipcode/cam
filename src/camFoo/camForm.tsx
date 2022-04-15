import React from "react"
import { useCam } from './useCam'


function CamForm() {
    const { cam, camForm, setCam, doubleCam, setCamForm } = useCam();
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
                console.log("bob is in lovse")
                //@ts-ignore
                console.log(e.target.elements)
                const form = e.target;
                // get the field that you want
                // //@ts-ignore
                // const userName = form.elements['userName'].value
                // //@ts-ignore
                // const activityId = form.elements['activityId'].value
                //@ts-ignore
                const activityName = form.elements['activityName'].value;
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
                    establishCamForm() {
                        console.log("hi")
                    }
                })
            }
            }>

                {/* <label htmlFor='userName'>Username: </label>
                <input type="text" id='userName' name='userName' disabled /> <br />
                */}
                <label htmlFor='activityId'>Activity Id: </label>
                <input type="text" id='activityId' name='activityId' disabled value={camForm.activityId} /> <br /> 
                <label htmlFor='activityName'>Activity Name: </label>
                <input type="text" id='activityName' name='activityName' defaultValue={camForm.activityName} /> <br />
                <label htmlFor="startTime">StartTime: </label>
                <input type="time" name='startTime' id='startTime'  defaultValue={millisecondsStringToHourMinute(camForm.startTime)}    /> <br />
                <label htmlFor="endTime" >EndTime: </label>
                <input type="time" name='endTime' id='endTime'  defaultValue={millisecondsStringToHourMinute(camForm.endTime)} /> <br />

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