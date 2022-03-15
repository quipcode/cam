import React, { useEffect, useCallback, useState } from 'react'
import { Types } from './types'

const SidePiece = ({ data, activityColorMap, onSubmit}: any) => {

    const [activity, setActivity] = useState<Types.Data>(data)
    //msToTime from https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript
    function msToTime(durationString: number) {
        let duration = durationString
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

    function formatDate(date: Date) {
        console.log("the data is 00 ", date, date.getFullYear())
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
    function myUpdate(data: any){
        // console.log("in my update")
        // console.log(data.target.value)
        // console.log(data.target.name)
        
        setActivity({...activity,
            [data.target.name]: data.target.value
        
        })
    }

    useEffect(()=>{
        setActivity(data)
    },[])
    return data ?
    
        // <div><p>I'm drowning</p></div>
        <div>
            {console.log(data,
                data.startTime,
                formatDate(new Date(parseInt(data.startTime))),
                data.activityName,
                data.startTime,
                data.endTime
                )}
            <form onSubmit={e => {
                e.preventDefault();
                onSubmit(data)
            }}
                // onChange={e => myUpdate(e)}
            >

                <input type="date" defaultValue={formatDate(new Date(data.startTime))} />
                <br />
                <label htmlFor="activityName">Activity Name: </label>
                <input type="text" id="activityName" name="activityName" defaultValue={data.activityName} />
                <br />
                <label htmlFor="activityColor">Select your activity color:</label>

                <input type="color" id="activityColor" name="activityColor" defaultValue={activityColorMap[data.activityName]} />
                <br />
                <label htmlFor="startTime">Activity Start Time: </label>
                <input type="time" id="startTimeForm" name="startTime" defaultValue={msToTime(parseInt(data.startTime))} />
                <br />
                <label htmlFor="endTime">Activity End Time: </label>
                <input type="time" id="endTimeForm" name="endTime" defaultValue={msToTime(parseInt(data.endTime))} />
                <button type="submit" >Update</button>
            </form>

        </div>
 : 
 <div>
 {console.log(data)}
 <p>nope</p>
        </div>       
 
 
 
  

}

export default SidePiece