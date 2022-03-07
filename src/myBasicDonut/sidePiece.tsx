import React from 'react'

const SidePiece = (props: any, mouse: any, event: any, data: any) => {
    return props.setVisible ? <div>
        <p>Activity Name: {event.target.__data__.data.activityName}</p>
        <p>startTime: {event.target.__data__.data.startTime}</p>
        <p>endTime: {event.target.__data__.data.endTime}</p>
    </div> : <div><p>I'm drowning</p></div>
}

export default SidePiece