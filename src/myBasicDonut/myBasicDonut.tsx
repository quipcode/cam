import React, { useEffect, useCallback, useState } from 'react'
import * as d3 from 'd3'
import { Types } from './types'

const MyBasicDonut = () => {
    const [data, setData] = useState<Types.Data[]>([{}])
    let now = new Date()
    let thisYear = now.getFullYear()
    let thisMonth = now.getMonth()
    let thisDay = now.getDate()
    let thisDayStart = new Date(thisYear, thisMonth, thisDay)
    let thisDayEnd = new Date(thisDayStart.getTime() + 86399999)
    console.log("the start of day is: " + thisDayStart + `/n` + 'the end of day is: ' + `/n` + "the duration is: " + thisDayEnd.getTime().valueOf() + " " +  thisDayStart.getTime().valueOf()) 
    const loadData = () => {
        d3.dsv(',', '/data/mybasicdonut.csv', (d) => {
            console.log("hi")
            console.log(d)
            return (d as unknown) as Types.Data[]

        }).then((d) => {
            setData((d as unknown) as Types.Data[])
        })
    }
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
        .sort(null) // Do not sort group by size
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
    return (
        <>
            <>
                <h3> The basic Donut Chart</h3>
                <div id="my_dataviz"></div>
            </>
        </>
    )
}

export default MyBasicDonut