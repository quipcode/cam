import * as React from 'react';
import { CamContextType, ICam } from '../@types/cam';

export const CamContext = React.createContext<CamContextType | null>(null);

let rawData = [
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "momentId": "2",
        "momentName": "workout",
        "startTime": "1645450800000",
        "endTime": "1645458000000",
        "duration": "7200000"
    },
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "momentId": "3",
        "momentName": "pray",
        "startTime": "1645450200000",
        "endTime": "1645450800000",
        "duration": "600000"
    },
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "momentId": "4",
        "momentName": "music",
        "startTime": "1645461600000",
        "endTime": "1645465200000",
        "duration": "3600000"
    },
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "momentId": "5",
        "momentName": "read",
        "startTime": "1645472400000",
        "endTime": "1645486800000",
        "duration": "14400000"
    },
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "momentId": "6",
        "momentName": "golf",
        "startTime": "1645468800000",
        "endTime": "1645472400000",
        "duration": "3600000"
    },
    {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "momentId": "1",
        "momentName": "hygiene",
        "startTime": "1645448400000",
        "endTime": "1645450200000",
        "duration": "1800000"
    }
]

const sortData = (opts: ICam[]) => {
    let newArray = [...opts]
    newArray.sort((a, b): any => {
        return parseInt(a.startTime) - parseInt(b.startTime)
    })
    return newArray
}

const createGap = (opts: ICam) => {
    let newGap = { ...opts }
    if (newGap.endTime && newGap.startTime) {
        let numDuration = parseInt(newGap.endTime) - parseInt(newGap.startTime)
        newGap.duration = numDuration.toString()
    }
    newGap.momentId = '0'
    newGap.momentName = 'gap'
    return newGap;
}

// call api to get 'dayactivities'
//sort my data by time
// start at starttime and find nextActivity
//create gap from startTime to nextActivity
// if activity present don't create gap...instead update currenttime to activity end time
const makingGaps = (opts: ICam[]) => {
    let sortedActivities = sortData(opts)
    var dayStart = new Date();
    dayStart.setUTCHours(0, 0, 0, 0);

    var dayEnd = new Date();
    dayEnd.setUTCHours(23, 59, 59, 999);

    let currentTime = parseInt(sortedActivities[0].dayStart!) || dayStart
    let endDayTime = parseInt(sortedActivities[0].dayEnd!) || dayEnd
    let idx = 0, endIdx = sortedActivities.length
    let gappedDay = []
    while (idx < endIdx) {
        let currentActivity = sortedActivities[idx]
        // console.log(sortedActivities)/
        let activityStartTime = parseInt(currentActivity.startTime!)
        let activityEndTime = parseInt(currentActivity.endTime!)
        if (activityStartTime == currentTime) {
            gappedDay.push(currentActivity)

        } else {
            let gappedDataDay = {} as ICam
            gappedDataDay.dayStart = dayStart.toString()
            gappedDataDay.dayEnd = dayEnd.toString()
            let gapStart = currentTime
            let gapEnd = currentActivity.startTime
            gappedDataDay.startTime = gapStart.toString()
            gappedDataDay.endTime = gapEnd
            let newGap = createGap(gappedDataDay)
            gappedDay.push(newGap)
            gappedDay.push(currentActivity)
        }
        currentTime = activityEndTime
        idx += 1
    }
    return gappedDay

}

let gappedData = makingGaps(rawData)
const CamProvider: React.FC<React.ReactNode> = ({children}) => {
    
    const [cams, setCams] = React.useState<ICam[]>(gappedData)
    

 

    const saveCam = (cam : ICam) => {
        const newCam: ICam = {
            userName: "mustafa",
            dayStart:  cam.dayStart,
            dayEnd: cam.dayEnd,
            momentId: Math.random().toString(),
            momentName: cam.momentName,
            startTime: cam.startTime,
            endTime: cam.endTime,
            duration: (parseInt(cam.endTime) - parseInt(cam.startTime)).toString()
        }
        setCams([...cams, newCam])
    }

    const updateCam = (incomingCam: ICam) => {
        // setTodos({ ...todos, [todo.id]: todo });
        setCams({ ...cams, [incomingCam.momentId]: incomingCam });
        
        // cams.filter((cam : ICam) => {
        //     if (cam.momentId === incomingCam.momentId){
        //         cam.userName = incomingCam.userName;
        //         cam.dayStart = incomingCam.dayStart,
        //         cam.dayEnd = incomingCam.dayEnd,
        //         cam.momentName = incomingCam.momentName,
        //         cam.startTime = incomingCam.startTime,
        //         cam.endTime = incomingCam.endTime,
        //         cam.duration = (parseInt(incomingCam.endTime) - parseInt(incomingCam.startTime)).toString()
        //         setCams([...cams])
        //     }
        // });
    };

    return <CamContext.Provider value={{cams, saveCam, updateCam, makingGaps}}>{children}</CamContext.Provider>
}

export default CamProvider