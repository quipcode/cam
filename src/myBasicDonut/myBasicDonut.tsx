import React, { useEffect, useCallback, useState } from 'react'
import * as d3 from 'd3'
import { Types } from './types'
import SidePiece from './sidePiece'
import { renderToString } from 'react-dom/server'

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


const MyBasicDonut = () => {
    const [data, setData] = useState<Types.Data[]>([{}])
    const [activityColor, setActivityColor] = useState<Types.ActivityColor[]>([{}])
    const [gappedData, setGappedData] = useState<Types.Data[]>([{}])
    let now = new Date()
    let thisYear = now.getFullYear()
    let thisMonth = now.getMonth()
    let thisDay = now.getDate()
    let thisDayStart = new Date(thisYear, thisMonth, thisDay)
    let thisDayEnd = new Date(thisDayStart.getTime() + 86399999)
    // console.log("the start of day is: " + thisDayStart + `/n` + 'the end of day is: ' + `/n` + "the duration is: " + thisDayEnd.getTime().valueOf() + " " +  thisDayStart.getTime().valueOf()) 
    let rawData = [
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
        })
        return newArray
    }

    const createGap = (opts: Data) => {
        let newGap = {...opts}
        if (newGap.endTime && newGap.startTime) {
            let numDuration = parseInt(newGap.endTime) - parseInt(newGap.startTime)
            newGap.duration = numDuration.toString()
        }
        newGap.activityId = '0'
        newGap.activityName = 'gap'
        return newGap;
    }

    // call api to get 'dayactivities'
    //sort my data by time
    // start at starttime and find nextActivity
    //create gap from startTime to nextActivity
    // if activity present don't create gap...instead update currenttime to activity end time
    const makingGaps = (opts: Data[]) => {
        let sortedActivities = sortData(opts)
        var dayStart = new Date();
        dayStart.setUTCHours(0, 0, 0, 0);

        var dayEnd = new Date();
        dayEnd.setUTCHours(23, 59, 59, 999);

        let currentTime = parseInt(sortedActivities[0].dayStart!) ||  dayStart 
        let endDayTime = parseInt(sortedActivities[0].dayEnd!) || dayEnd
        let idx = 0, endIdx = sortedActivities.length
        let gappedDay = []
        while( idx < endIdx){
            let currentActivity = sortedActivities[idx]
            // console.log(sortedActivities)
            let activityStartTime = parseInt(currentActivity.startTime!) 
            let activityEndTime = parseInt(currentActivity.endTime!)
            if (activityStartTime == currentTime ){
                gappedDay.push(currentActivity)
                
            }else{
                let gappedDataDay = {} as Data
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

    let gappingDay = makingGaps(rawData)
    // console.log("ungapped day")
    // console.log(rawData)
    // console.log("gapped day")
    // console.log(gappingDay)

const loadColorData = () => {
    d3.dsv(',', '/data/color.csv', (d) => {
        return (d as unknown) as Types.ActivityColor[]
    }).then((d) => {
        setActivityColor((d as unknown) as Types.ActivityColor[])
    })
}

    const loadData = () => {
        d3.dsv(',', '/data/mybasicdonut.csv', (d) => {
            return (d as unknown) as Types.Data[]
        }).then((d) => {
            setData((d as unknown) as Types.Data[])
            setGappedData((d as unknown) as Types.Data[])
        })
    }
    
    useEffect(() => {
        if (data.length <= 1)
            loadData()
        if (activityColor.length <= 1)
            loadColorData()
    })
    console.log("in the big leagues")
    
    let coloredActivityName:string[] = [], associatedColor:string[] = []
    activityColor.forEach((v) => {
        coloredActivityName.push(v.activityName!)
        associatedColor.push(v.colorHexCode!)
    })
    console.log(activityColor, data)
    console.log(coloredActivityName, associatedColor)
    // set the dimensions and margins of the graph
    const width = 450,
        height = 450,
        margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    const svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    // Create dummy data
    // const data = { a: 9, b: 20, c: 30, d: 8, e: 12, f: 3, g: 7, h: 14 }

    // set the color scale
    const color = d3.scaleOrdinal()
        .domain(
                coloredActivityName
            // (d3.extent(gappingDay, (d) => {
            //         return d.activityName
            //     }) as unknown) as string
        )
        // .domain(["a", "b", "c", "d", "e", "f", "g", "h"])
        // .range(d3.schemeDark2);
        // .range(d3.schemeCategory10);
        .range(associatedColor);

    // Compute the position of each group on the pie:
    const pie = d3.pie()
        // .sort(null) // Do not sort group by size
        .sort((a, b) => b.valueOf() - a.valueOf())
        //@ts-ignore
        .value(d => d.duration)
    //@ts-ignore
    // const data_ready = pie(Object.entries(data))
    // const pieData = pie(data)
    const data_ready = pie(gappingDay)

    // The arc generator
    const arc = d3.arc()
        .innerRadius(radius * 0.5)         // This is the size of the donut hole
        .outerRadius(radius * 0.8)

    // Another arc that won't be drawn. Just for labels positioning
    const outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('allSlices')
        .data(data_ready)
        .join('path')
        //@ts-ignore
        .attr('d', arc)
        //@ts-ignore
        .attr('fill', d => color(d.data.activityName))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        // .enter()
        // .append("div");

    // Add the polylines between chart and labels:
    svg
        .selectAll('allPolylines')
        .data(data_ready)
        .join('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        //@ts-ignore
        .attr('points', function (d) {
            //@ts-ignore
            const posA = arc.centroid(d) // line insertion in the slice
            //@ts-ignore
            const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
            //@ts-ignore
            const posC = outerArc.centroid(d); // Label position = almost the same as posB
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
            return [posA, posB, posC]
        })


    // Add the polylines between chart and labels:
    svg
        .selectAll('allLabels')
        .data(data_ready)
        .join('text')
        //@ts-ignore
        .text(d => d.data.activityName)
        .attr('transform', function (d) {
            //@ts-ignore
            const pos = outerArc.centroid(d);
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return `translate(${pos})`;
        })
        .style('text-anchor', function (d) {
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
        })
    
    // svg.on("mouseover", function (event) { TimeEditor.text(event.target.__data__.data.activityName); return TimeEditor.style("visibility", "visible");  })
    //     .on("mousemove", function (event) { return TimeEditor.style("top", (event.clientY - 10) + "px").style("left", (event.clientX + 10) + "px"); })
    //     .on("mouseout", function () { return TimeEditor.style("visibility", "hidden"); });

    // var nickMaker = d3.select("#timeEditor")
    //     .append("div")
    //     .style("position", "absolute")
    //     .style("z-index", "10")
    //     .style("visibility", "hidden")
    //     .style("background", "#000  ")
    //     .text("a simple tooltip");

    // svg.on("mouseover", function (event) { 
    //     nickMaker.text(event.target.__data__.data.activityName); 
    //     <SidePiece setVisible={true} />
    //     return nickMaker.style("visibility", "visible"); 
        
    // })
    //     .on("mousemove", function (event) { 
    //         return nickMaker.style("top", (event.clientY - 10) + "px").style("left", (event.clientX + 10) + "px"); })
    //     .on("mouseout", function () { 
    //         <SidePiece setVisible={false} />
    //         return nickMaker.style("visibility", "hidden"); 
    //     });
   
    svg.on("click", function (event) {
        var mouse = d3.pointer(this);
        // svg
        //     .append("use")
        //     .attr("href", "#pointer")
        //     .attr("x", mouse[0])
        //     .attr("y", mouse[1])
        //     .attr("fill", "#039BE5")
        //     .attr("stroke", "#039BE5")
        //     .style("background", "#000  ")
        //     .attr("stroke-width", "1px");
        // return <SidePiece setVisible={true}></SidePiece>
        let bob = SidePiece({ setVisible :true}, mouse, event, null)
        let bobString = renderToString(bob)
        d3.select("#bucket")
            .html(bobString)
        // d3.select("#bucket")
        //     .append("div")
        //     .style("position", "absolute")
        //     .style("z-index", "10")
        //     .style("visibility", "visible")
        //     .style("background", "#FF0000")
        //     .text(event.target.__data__.data.activityName);
            // .text("a simple tooltip");
    });
    return (
        <>
            <>
                <body>
                <h3> The basic Donut Chart</h3>
                
                        <div id="my_dataviz"></div>
                        
                
                <div id='bucket'></div>
                
                </body>
            </>
        </>
    )

    let infoBox:any = null;

    // function mouseEnter() {
    //     if (infoBox)
    //         return;
    //     let mouse = d3.mouse
    //     var coord = svg.on("click", )
    //     d3.pointer(d3.event.currentTarget);
    //     x1 = parseInt(coord[0]);
    //     y1 = parseInt(coord[1]);

    //     console.log("mouseEnter", x1, y1, infoBox);

    //     infoBox = theSVG.append("g")
    //         .attr('class', 'ssInfoBox');

    //     var rectItem = infoBox.append("rect")
    //         .attr('x', x1)
    //         .attr('y', y1)
    //         .attr('width', 30)
    //         .attr('height', 20);

    //     var textItem = infoBox.append("text")
    //         .attr('x', x1)
    //         .attr('y', y1)
    //         .text("bobo");
    // }

    // function mouseExit() {
    //     if (infoBox === null)
    //         return;

    //     console.log("mouseExit", infoBox);
    //     infoBox.remove()
    //     infoBox = null;
    // }
}

export default MyBasicDonut