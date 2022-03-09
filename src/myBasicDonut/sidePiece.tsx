import React from 'react'

const SidePiece = (props: any, mouse: any, event: any, data: any, activityColorMap: any) => {
    //msToTime from https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript
    function msToTime(durationString: string) {
        let duration = parseInt(durationString)
        var milliseconds = Math.floor((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

       let hoursString = (hours < 10) ? "0" + hours : hours;
        let minutesString = (minutes < 10) ? "0" + minutes : minutes;
        let secondsString = (seconds < 10) ? "0" + seconds : seconds;

        return hoursString + ":" + minutesString + ":" + secondsString + "." + milliseconds;
    }
    // formating date from https://bobbyhadz.com/blog/javascript-convert-milliseconds-to-date
    function padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date : Date) {
        return (
            [
                date.getFullYear(),
                padTo2Digits(date.getMonth() + 1),
                padTo2Digits(date.getDate()),
                
            ].join('-')
            //  +
            // ' ' +
            // [
            //     padTo2Digits(date.getHours()),
            //     padTo2Digits(date.getMinutes()),
            //     padTo2Digits(date.getSeconds()),
            // ].join(':')
        );
    }
    console.log("in the form ")
    console.log(event, activityColorMap)
    return props.setVisible ? 
    <div>
        <form>
                

                <input type="date" value={formatDate(new Date(parseInt(event.target.__data__.data.startTime)))} />
                <br />
                <label htmlFor="activityName">Activity Name: </label>
                <input type="text" id="activityName" name="activityName" value={event.target.__data__.data.activityName}/>
                <br/>
                <label htmlFor="activityColor">Select your activity color:</label>
                <input type="color" id="activityColor" name="activityColor" value={activityColorMap[event.target.__data__.data.activityName]}/>
                <br />
                <label htmlFor="startTime">Activity Start Time: </label>
                <input type="time" id="startTimeForm" name="startTime" value={msToTime(event.target.__data__.data.startTime)}/>
                <br />
                <label htmlFor="endTime">Activity End Time: </label>
                <input type="time" id="endTimeForm" name="endTime" value={msToTime(event.target.__data__.data.endTime)} />
        </form>
        
    </div> : <div><p>I'm drowning</p></div>
}

export default SidePiece