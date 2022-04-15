import React, {createContext, useReducer, useCallback} from 'react'
import {
    camReducer,
    CamState,
    Cam,
    CamForm,
    CamData,
    Actions,
    ActionsMap    
} from './camReducer'

export type Dispatcher = <
    Type extends Actions["type"],
    Payload extends ActionsMap[Type]
    >(
        type: Type,
        ...payload: Payload extends undefined ? [undefined?] : [Payload]
    ) => void;

type CamContextInterface = readonly [CamState, Dispatcher];

const sortData = (opts: CamData[]) => {
    let newArray = [...opts]
    newArray.sort((a, b): any => {
        if (a.startTime && b.startTime) {
            return parseInt(a.startTime) - parseInt(b.startTime)
        }
    })
    return newArray
}

const createGap = (opts: CamData) => {
    let newGap = { ...opts }
    if (newGap.endTime && newGap.startTime) {
        let numDuration = parseInt(newGap.endTime) - parseInt(newGap.startTime)
        newGap.duration = numDuration.toString()
    }
    newGap.activityId = 0
    newGap.activityName = 'gap'
    return newGap;
}


const makingGaps = (opts: CamData[]) => {
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
            let gappedDataDay = {} as CamData
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
const sampleData = [
    {
        "activityId": 1,
        "activityName": "workout",
        "startTime": "1645450800000",
        "endTime": "1645458000000",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "duration": "7200000"
    },
    {
        "activityId": 2,
        "activityName": "pray",
        "startTime": "1645450200000",
        "endTime": "1645450800000",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "duration": "600000"
    },
    {
        "activityId": 3,
        "activityName": "music",
        "startTime": "1645461600000",
        "endTime": "1645465200000",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "duration": "3600000"
    },
    {
        "activityId": 4,
        "activityName": "read",
        "startTime": "1645472400000",
        "endTime": "1645486800000",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "duration": "14400000"
    },
    {
        "activityId": 5,
        "activityName": "golf",
        "startTime": "1645468800000",
        "endTime": "1645472400000",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "duration": "3600000"
    },
    {
        "activityId": 6,
        "activityName": "hygiene",
        "startTime": "1645448400000",
        "endTime": "1645450200000",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "duration": "1800000"
    }
]

const gappedDay = makingGaps(sampleData)

const startingCam: Cam = {
    establishCam(){
        console.log("been cammed")
    },
    data: gappedDay
}

const startingCamForm: CamForm = {
    establishCamForm: function (): void {
        throw new Error('Function not implemented.');
    },
    activityId: 0,
    activityName: '',
    startTime: 0,
    endTime: 0
}

export const CamContext = createContext<CamContextInterface>([
    {cam: startingCam,
    camForm: startingCamForm
    },
    ()=> {}
])

export function CamProvider ({children}: any){
    const [state, _dispatch] = useReducer(camReducer, {
        cam: startingCam,
        camForm: startingCamForm
    })

    const dispatch: Dispatcher = useCallback((type, ...payload) => {
        _dispatch({type, payload: payload[0]}  as Actions)
    }, [])
    return (
        <CamContext.Provider value={[state, dispatch]}>
            {children}
        </CamContext.Provider>
    )
}

