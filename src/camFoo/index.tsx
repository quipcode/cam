import React from 'react';
import ReactDom from 'react-dom';
// import { FooBarProvider } from './fooBarContext';
// import { Foo } from './foo';
// import { Bar } from './bar';
import { CamProvider } from './camContext';
import  Cam from './cam';
import CamForm from './camForm';
import Chart from './chart';

function CamFoo() {
    return (

        // <CamForm/>
        <CamProvider>
            <Cam/>
            <CamForm/>
            <Chart />
        </CamProvider>
        // <FooBarProvider>
        //     <Foo />
        //     <Bar />
        // </FooBarProvider>
    )
}

export default CamFoo;