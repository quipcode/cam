import React from 'react';
import ReactDom from 'react-dom';
import { FooBarProvider } from './fooBarContext';
import { Foo } from './foo';
import { Bar } from './bar';

function FooBarApp() {
    return (
        <FooBarProvider>
            <Foo />
            <Bar />
        </FooBarProvider>
    )
}

export default FooBarApp
// ReactDom.render(<App />, document.getElementById('app'));