import React from 'react';
import ReactDom from 'react-dom';
// import { FooBarProvider } from './fooBarContext';
// import { Foo } from './foo';
// import { Bar } from './bar';
import { CamProvider } from './camContext';
import  Cam from './cam';
import CamForm from './camForm';
import Chart from './chart';

let rawData = [
    {
        "activityName": "workout",
        "startTime": "1645450800000",
        "endTime": "1645458000000",
    },
    {
        "activityName": "pray",
        "startTime": "1645450200000",
        "endTime": "1645450800000",
    },
    {
        "activityName": "music",
        "startTime": "1645461600000",
        "endTime": "1645465200000",
    },
    {
        "activityName": "read",
        "startTime": "1645472400000",
        "endTime": "1645486800000",
    },
    {
        "activityName": "golf",
        "startTime": "1645468800000",
        "endTime": "1645472400000",
    },
    {
        "activityName": "hygiene",
        "startTime": "1645448400000",
        "endTime": "1645450200000",
    }
]


function CamFoo() {
    return (

        // <CamForm/>
        <CamProvider>
            <Cam/>
            <CamForm/>
            <Chart data={rawData}/>
        </CamProvider>
        // <FooBarProvider>
        //     <Foo />
        //     <Bar />
        // </FooBarProvider>
    )
}

export default CamFoo;