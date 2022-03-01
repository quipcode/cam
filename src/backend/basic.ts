import React, { useEffect, useCallback, useState } from 'react'
import { Types } from './types'

const BasicBackend = () => {
let now = new Date()
let thisYear = now.getFullYear()
let thisMonth = now.getMonth()
let thisDay = now.getDate()
let thisDayStart = new Date(thisYear, thisMonth, thisDay)
let thisDayEnd = new Date(thisDayStart.getTime() + 86399999)

}

// interface Data {
//     userName?: string;
//     dayStart?: number;
//     dayEnd?: number;
//     activityId?: string;
//     activityName?: string;
//     startTime?: number;
//     endTime?: number;
//     duration?: number
// }

interface Data {
    userName?: string;
    dayStart?: string;
    dayEnd?: string;
    activityId?: string;
    activityName?: string;
    startTime?: string;
    endTime?: string;
    duration?: string
}

// startTime:number, endTime: number, date: number,
const createGap = (opts: Data) => {
    let newGap = { ...opts }
    if (newGap.endTime && newGap.startTime) {
        let numDuration = parseInt(newGap.endTime) - parseInt(newGap.startTime)
        newGap.duration = numDuration.toString()
    }
    newGap.activityId = '0'
    newGap.activityName = 'gap'
    return newGap;
}

let rawData = [
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "activityId": "7",
        "activityName": "full day",
        "startTime": "1645430400000",
        "endTime": "1645516799999",
        "duration": "86399999"
    },    
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "activityId": "2",
        "activityName": "workout",
        "startTime": "1645450800000",
        "endTime": "1645458000000",
        "duration": "7200000"
    },
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "activityId": "3",
        "activityName": "pray",
        "startTime": "1645450200000",
        "endTime": "1645450800000",
        "duration": "600000"
    },
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "activityId": "4",
        "activityName": "music",
        "startTime": "1645461600000",
        "endTime": "1645465200000",
        "duration": "3600000"
    },
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "activityId": "5",
        "activityName": "read",
        "startTime": "1645472400000",
        "endTime": "1645486800000",
        "duration": "14400000"
    },
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "activityId": "6",
        "activityName": "golf",
        "startTime": "1645468800000",
        "endTime": "1645472400000",
        "duration": "3600000"
    },
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "activityId": "1",
        "activityName": "hygiene",
        "startTime": "1645448400000",
        "endTime": "1645450200000",
        "duration": "1800000"
    }
]
const sortData = (opts: Data[]) => {
    let newArray = [...opts]
    newArray.sort((a, b): any => {
        if (a.startTime && b.startTime) {
            return parseInt(a.startTime) - parseInt(b.startTime)
        }
        // if(a.activityId && b.activityId){
        //     console.log(parseInt(b.activityId) - parseInt(a.activityId))
        //     return parseInt(a.activityId) - parseInt(b.activityId)
        // }
    })
    return newArray
}


const makingGappedDays = (opts: Data[]) => {
    let sortedActivities = sortData(opts)
    // let newArray = [...opts]
    let gappedDay = [...sortedActivities]
    let currentTime = gappedDay[0].dayStart, dayEnd = gappedDay[0].dayEnd
    let activityIdx = 0, activityEndIdx = sortedActivities.length
    let shellData = {} as Data;

    // let shellData: Data = {
    //     "userName": null,
    //     "dayStart": null,
    //     "dayEnd": null,
    //     "activityId": null,
    //     "activityName": null,
    //     "startTime": null,
    //     "endTime":  null
    // }
    if (opts[0]) {
        shellData.userName = opts[0].userName;
        shellData.dayStart = opts[0].dayStart
        shellData.dayEnd = opts[0].dayEnd;
    }


    // {...opts[0]}
    // shellData.activityId =null
    if (currentTime && dayEnd) {
        while (currentTime < dayEnd) {
            let currentActivity = sortedActivities[activityIdx]
            let gapEnd = null
            if (activityIdx + 1 < activityEndIdx) {
                gapEnd = sortedActivities[activityIdx + 1].startTime
            } else {
                gapEnd = currentActivity.dayEnd
            }
            let gapStart = currentActivity.endTime
            shellData.startTime = gapStart
            shellData.endTime = gapEnd
            let newGap = createGap(shellData)
            gappedDay.push(currentActivity)
            gappedDay.push(newGap)
            activityIdx += 1
            currentTime = gapEnd!
        }
    } else {
        return "You messed up"
    }
    return gappedDay
}


export default BasicBackend