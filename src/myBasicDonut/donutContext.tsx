import React, { useEffect } from "react";
import { Types } from './types'
import * as d3 from 'd3'


const actions = {
    SET_USERNAME: "SET_USERNAME",
    SET_ACTIVITYID: "SET_ACTIVITYID",
    SET_ACTIVITYNAME: "SET_ACTIVITYNAME",
    SET_STARTTIME: "SET_STARTTIME",
    SET_ENDTIME: "SET_ENDTIME",
    SET_DURATION: "SET_DURATION",
    SET_DAYSTART: "SET_DAYSTART",
    SET_DAYEND: "SET_DAYEND",
    SET_DATA: "SET_DATA",
    SET_GAPPED_DATA: "SET_GAPPED_DATA"
}

const initialState = {
    userName: "string",
    activityId: "string",
    activityName: "string",
    startTime: "string",
    endTime: "string",
    duration: "string",
    dayStart: "string",
    dayEnd: "string",
    data: [],
    gappedData: [],
    // setUserName: null,
    // setActivityId: null,
    // setActivityName: null,
    // setStartTime: null,
    // setEndTime: null,
    // setDuration: null,
    // setDayStart: null,
    // setDayEnd: null,
    // setData: null,
    // setGappedData: null

    // setUserName: (value: any) => { },
    // setActivityId: (value: any) => { },
    // setActivityName: (value: any) => { },
    // setStartTime: (value: any) => { },
    // setEndTime: (value: any) => { },
    // setDuration: (value: any) => { },
    // setDayStart: (value: any) => { },
    // setDayEnd: (value: any) => { },
    // setData: (value: any) => { },
    // setGappedData: (value: any) => { }
}

function reducer(state: any, action: any) {
    switch (action.type) {
        case actions.SET_USERNAME:
            return { ...state, username: action.value };
        case actions.SET_ACTIVITYID:
            return { ...state, activityId: action.value };
        case actions.SET_ACTIVITYNAME:
            return { ...state, activityName: action.value };
        case actions.SET_STARTTIME:
            return { ...state, startTime: action.value };
        case actions.SET_ENDTIME:
            return { ...state, endTime: action.value };
        case actions.SET_DURATION:
            return { ...state, duration: action.value };
        case actions.SET_DAYSTART:
            return { ...state, dayStart: action.value };
        case actions.SET_DAYEND:
            return { ...state, dayEnd: action.value };
        case actions.SET_DATA:
            return { ...state, data: action.value };
        case actions.SET_GAPPED_DATA:
            return { ...state, gappedData: action.value };
        // case actions.RESET:
        //     return { ...state, ...initialState };
        default:
            return state;
    }
}

export default function ScheduleContext() {
    return (
        <Provider>
            {/* <Filters />
            <Results /> */}
            <Ring />
            {/* <EditForm /> */}
        </Provider>
    );
}

const DonutContext = React.createContext(null);

function Provider({ children }: any) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const value = {
        userName: state.userName,
        activityId: state.activityId,
        activityName: state.activityName,
        startTime: state.startTime,
        endTime: state.endTime,
        duration: state.duration,
        dayStart: state.dayStart,
        dayEnd: state.dayEnd,
        data: state.data,
        gappedData: state.gappedData,

        setUserName: (value: any) => {
            dispatch({ type: actions.SET_USERNAME, value });
        },
        setActivityId: (value: any) => {
            dispatch({ type: actions.SET_ACTIVITYID, value });
        },
        setActivityName: (value: any) => {
            dispatch({ type: actions.SET_ACTIVITYNAME, value });
        },
        setStartTime: (value: any) => {
            dispatch({ type: actions.SET_STARTTIME, value });
        },
        setEndTime: (value: any) => {
            dispatch({ type: actions.SET_ENDTIME, value });
        },
        setDuration: (value: any) => {
            dispatch({ type: actions.SET_DURATION, value });
        },
        setDayStart: (value: any) => {
            dispatch({ type: actions.SET_DAYSTART, value });
        },
        setDayEnd: (value: any) => {
            dispatch({ type: actions.SET_DAYEND, value });
        },
        setData: (value: any) => {
            dispatch({ type: actions.SET_DATA, value });
        },
        setGappedData: (value: any) => {
            dispatch({ type: actions.SET_GAPPED_DATA, value });
        }

    };

    return (
        <DonutContext.Provider value={value}>
            {children}
        </DonutContext.Provider>
    );
}

// =================================================================================


// =================================================================================

function mapFromRawDataToData(csvStringData: any): any {

    return csvStringData.map((e: any) => {
        return {
            activityId: parseInt(e["activityId"]),
            activityName: e["activityName"],
            dayEnd: parseInt(e["dayEnd"]),
            dayStart: parseInt(e["dayStart"]),
            duration: parseInt(e["duration"]),
            endTime: parseInt(e["endTime"]),
            startTime: parseInt(e["startTime"]),
            userName: e["userName"],
        }
    })


}

const sortData = (opts: Types.Data[]) => {
    let newArray = [...opts]
    console.log("in sort", newArray)
    newArray.sort((a, b): any => {
        if (a.startTime && b.startTime) {
            return parseInt(a.startTime) - parseInt(b.startTime)
        }
    })
    return newArray
}

const createGap = (opts: Types.Data) => {
    let newGap = { ...opts }
    if (newGap.endTime && newGap.startTime) {
        let numDuration = parseInt(newGap.endTime) - parseInt(newGap.startTime)
        newGap.duration = numDuration.toString()
    }
    newGap.activityId = '0'
    newGap.activityName = 'gap'
    return newGap;
}


const makingGaps = (opts: Types.Data[]) => {
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
            let gappedDataDay = {} as Types.Data
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


function Ring() {
    const { userName, setUserName, activityId, setActivityId, activityName, setActivityName, startTime, setStartTime,
        endTime, setEndTime, duration, setDuration, dayStart, setDayStart, dayEnd, setDayEnd, data, setData, gappedData, setGappedData } = React.useContext(DonutContext)
    // const { userName, activityId, activityName, startTime, endTime, duration, dayStart, dayEnd } = React.useContext(DonutContext);
    // const { rating, price } = React.useContext(DonutContext);
    const loadData = () => {
        d3.dsv(',', '/data/mybasicdonut.csv', (d) => {
            return (d as unknown) as Types.Data[]
        }).then((d) => {

            setData((mapFromRawDataToData(d)) as Types.Data[])
            console.log(data, d)
            let gaps = makingGaps(mapFromRawDataToData(d) as Types.Data[])

            setGappedData(gaps)
            setUserName("bob")
            console.log("in load data", data, gaps, gappedData, userName)
        })
    }

    useEffect(() => {
        if (data.length <= 1)
            loadData()
        // console.log("loading data")
        // if (activityColor.length <= 1)
        //     loadColorData()
    }, [])
    return (
        <div>
            <p> Making a new segment</p>
            { setUserName("nicki")}
            {
                // let fullContext = React.useContext(donutContext)

                console.log(data, gappedData, "what", DonutContext, userName)
            }
        </div>
    )


    // const filtered = restaurants.filter(
    //     restaurant => restaurant.rating >= rating && restaurant.price >= price
    // );

    // return (
    //     <ul>
    //         {filtered.map(restaurant => (
    //             <li key={restaurant.name}>
    //                 <h2>{restaurant.name}</h2>

    //                 <p>
    //                     {[...Array(restaurant.rating)].map((_, n) => (
    //                         <span role="img" aria-label="star" key={n}>
    //                             ⭐️
    //                         </span>
    //                     ))}
    //                     <br />
    //                     {[...Array(restaurant.price)].map((_, n) => (
    //                         <span role="img" aria-label="money bag" key={n}>
    //                             💰
    //                         </span>
    //                     ))}
    //                 </p>
    //             </li>
    //         ))}
    //     </ul>
    // );
}

// function Results() {
//     const { rating, price } = React.useContext(RestaurantContext);
//     const filtered = restaurants.filter(
//         restaurant => restaurant.rating >= rating && restaurant.price >= price
//     );

//     return (
//         <ul>
//             {filtered.map(restaurant => (
//                 <li key={restaurant.name}>
//                     <h2>{restaurant.name}</h2>

//                     <p>
//                         {[...Array(restaurant.rating)].map((_, n) => (
//                             <span role="img" aria-label="star" key={n}>
//                                 ⭐️
//                             </span>
//                         ))}
//                         <br />
//                         {[...Array(restaurant.price)].map((_, n) => (
//                             <span role="img" aria-label="money bag" key={n}>
//                                 💰
//                             </span>
//                         ))}
//                     </p>
//                 </li>
//             ))}
//         </ul>
//     );
// }