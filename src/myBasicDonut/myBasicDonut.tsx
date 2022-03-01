import React, { useEffect, useCallback, useState } from 'react'
import * as d3 from 'd3'
import { Types } from './types'

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
    const [gappedData, setGappedData] = useState<Types.Data[]>([{}])
    let now = new Date()
    let thisYear = now.getFullYear()
    let thisMonth = now.getMonth()
    let thisDay = now.getDate()
    let thisDayStart = new Date(thisYear, thisMonth, thisDay)
    let thisDayEnd = new Date(thisDayStart.getTime() + 86399999)
    console.log("the start of day is: " + thisDayStart + `/n` + 'the end of day is: ' + `/n` + "the duration is: " + thisDayEnd.getTime().valueOf() + " " +  thisDayStart.getTime().valueOf()) 
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
            // if(a.activityId && b.activityId){
            //     console.log(parseInt(b.activityId) - parseInt(a.activityId))
            //     return parseInt(a.activityId) - parseInt(b.activityId)
            // }
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

    let dummyTime = {
        "userName": "mustafa",
        "dayStart": "1645430400000",
        "dayEnd": "1645516799999",
        "activityId": "1",
        "activityName": "hygiene",
        "startTime": "1645448400000",
        "endTime": "1645450200000",
        
    }

    const makingGappedDays = (opts: Data[]) => {
        let sortedActivities = sortData(opts)
        // let newArray = [...opts]
        let gappedDay = [...sortedActivities]
        let currentTime = gappedDay[0].dayStart, dayEnd = gappedDay[0].dayEnd
        let activityIdx = 0, activityEndIdx = sortedActivities.length
        let shellData  = {} as Data;

        // let shellData: Data = {
        //     "userName": null,
        //     "dayStart": null,
        //     "dayEnd": null,
        //     "activityId": null,
        //     "activityName": null,
        //     "startTime": null,
        //     "endTime":  null
        // }
        if(opts[0]){
            shellData.userName = opts[0].userName;
            shellData.dayStart = opts[0].dayStart
            shellData.dayEnd = opts[0].dayEnd;
        }
        
        
        // {...opts[0]}
        // shellData.activityId =null
        if(currentTime && dayEnd){
            while (currentTime < dayEnd) {
                let currentActivity = sortedActivities[activityIdx]
                let gapEnd  = null
                if(activityIdx + 1 < activityEndIdx){
                    gapEnd = sortedActivities[activityIdx + 1].startTime
                }else{
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
        }else{
            return "You messed up"
        }
        return gappedDay
    }

    let gappingDay = makingGappedDays(rawData)
    console.log("ungapped day")
    console.log(rawData)
    console.log("gapped day")
    console.log(gappingDay)

    const loadData = () => {
        d3.dsv(',', '/data/mybasicdonut.csv', (d) => {
            console.log("hi")
            console.log(d)
            return (d as unknown) as Types.Data[]

        }).then((d) => {
            setData((d as unknown) as Types.Data[])
            setGappedData((d as unknown) as Types.Data[])
        })
    }
    // console.log(data)
    // console.log("gapped data is below")
    // console.log(gappedData)
    // setGappedData(data)
    // data.sort((n1, n2) => {
    //     if (n1.age > n2.age) {
    //         return 1;
    //     }

    //     if (n1.age < n2.age) {
    //         return -1;
    //     }

    //     return 0;
    // });
    // setGappedData(if(data){
    //     data.sort((a, b) => a.activityName - b.activityName)
    // })
    
    useEffect(() => {
        if (data.length <= 1)
            loadData()
    })
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
            (d3.extent(data, (d) => {
                return d.activityName   
                // return d.activityName
            }) as unknown) as string
        )
        // .domain(["a", "b", "c", "d", "e", "f", "g", "h"])
    
        // .range(d3.schemeDark2);
        .range(d3.schemeCategory10);

    // Compute the position of each group on the pie:
    const pie = d3.pie()
        // .sort(null) // Do not sort group by size
        .sort((a, b) => b.valueOf() - a.valueOf())
        //@ts-ignore
        .value(d => d.duration)
    //@ts-ignore
    // const data_ready = pie(Object.entries(data))
    // const pieData = pie(data)
    const data_ready = pie(data)

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
    
    var divTip = d3.select("#my_dataviz").append("div")
        .attr("class", "tooltip-donut")
        .style("opacity", 0);
    // divTip.html(d.duration)
    //     .style("left", (d3.event.pageX + 10) + "px")
    //     .style("top", (d3.event.pageY - 15) + "px");
    // var parseDate = d3.time.format("%d-%b-%y").parse;
    // var formatTime = d3.time.format("%e %B");

    // svg.on('mouseover', (d, i) => {
    //     console.log(d);
    // });
    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background", "#fff")
        .text("a simple tooltip");

    svg.on("mouseover", function (event) { tooltip.text(event.target.__data__.data.activityName); return tooltip.style("visibility", "visible");  })
    .on("mousemove", function (event) { return tooltip.style("top", (event.clientY - 10) + "px").style("left", (event.clientX + 10) + "px"); })
    .on("mouseout", function () { return tooltip.style("visibility", "hidden"); });

    // svg.on("mouseover", function (d) {
    //     divTip.transition()
    //         .duration(200)
    //         .style("opacity", .9);
    //     // divTip.html("hello" + "<br/>" + d.close)
        
    //     //     .style("left", (d.clientX) + "px")
            
    //     //     .style("top", (d.clientY - 28) + "px");
    // })
    // .on("mouseout", function (d) {
    //     divTip.transition()
    //         .duration(500)
    //         .style("opacity", 0);
    // });

    // svg.on('mouseover', function (d, i) {
    //     d3.select(this).transition()
    //         .duration(50)
    //         .attr('opacity', '.85');
    //     divTip.transition()
    //         .duration(50)
    //         .style("opacity", 1);
    //     let num = (Math.round((d.value / d.data.all) * 100)).toString() + '%';
    //     divTip.html(num)
    //         .style("left", (d.clientX + 10) + "px")
    //         .style("top", (d.clientY - 15) + "px");
    // }).on('mouseout', function (d, i) {
    //     d3.select(this).transition()
    //         .duration(50)
    //         .attr('opacity', '1');
    //     divTip.transition()
    //         .duration(50)
    //         .style("opacity", 0);
    // });

    // svg.on('mouseover', function (d, i) {
    //         d3.select(this).transition()
    //             .duration(50)
    //             .attr('opacity', '.85'); 
    //     divTip.transition()
    //         .duration(50)
    //         .style("opacity", 1);
            
    //         })    
    // svg.on('mouseout', function (d, i) {
    //                 d3.select(this).transition()
    //                     .duration(50)
    //                     .attr('opacity', '1');
    //     divTip.transition()
    //         .duration(50)
    //         .style("opacity", 0);
    //                 })

    // svg.on("hover", function () {
    //     console.log("the biggest thing ever")
    //     // const m = d3.mouse(this);
    //     // const date = x.invert(m[0]);
    //     // const i = bisect.right(data, date);
    //     // mutable lookup = new Date(date);
    // });
    return (
        <>
            <>
                {/* <body> */}
                <h3> The basic Donut Chart</h3>
                <div id="my_dataviz"></div>
                {/* </body> */}
            </>
        </>
    )
}

export default MyBasicDonut