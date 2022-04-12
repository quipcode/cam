import React from "react"
import { useCam } from './useCam'

function CamForm() {
    const { cam, camForm, setCam, doubleCam, setCamForm } = useCam();

    return (
        <div>
            <h3>Cam Form</h3>
            <form onSubmit={(e) => {
                e.preventDefault()
                console.log("bob is in lovse")
                console.log(e.target)
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
                setCamForm({
                    startTime: startTime,
                    endTime: endTime,
                    activityName: activityName,
                    establishCamForm() {
                        console.log("hi")
                    }
                }

                )
            }
            }>

                {/* <label htmlFor='userName'>Username: </label>
                <input type="text" id='userName' name='userName' disabled /> <br />
                <label htmlFor='activityId'>Activity Id: </label>
                <input type="text" id='activityId' name='activityId' disabled /> <br /> */}
                <label htmlFor='activityName'>Activity Name: </label>
                <input type="text" id='activityName' name='activityName' /> <br />
                <label htmlFor="startTime">StartTime: </label>
                <input type="time" name='startTime' id='startTime' /> <br />
                <label htmlFor="endTime" >EndTime: </label>
                <input type="time" name='endTime' id='endTime' /> <br />

                <input type="submit" value="Submit" />
            </form>
            <div>
                <p>startTime: {camForm.startTime}</p>
                <p>endTime: {camForm.endTime}</p>
                <p>activityName: {camForm.activityName}</p>
            </div>
        </div>
    )
}

export default CamForm;