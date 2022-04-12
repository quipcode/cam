import React, { useEffect, useCallback, useState } from 'react'
import * as d3 from 'd3'
import { Types } from './types'

const Cam = () => {
    const [data, setData] = useState<Types.Data[]>([])
    // set the dimensions and margins of the graph
    const width = 450,
        height = 450,
        margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    const svg = d3.selectAll("#my_dataviz")
    // const svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    // Create dummy data
    const dataDummy = { a: 9, b: 20, c: 30, d: 8, e: 12, f: 3, g: 7, h: 14 }

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
    let domainActivityName = ["hygiene", "golf", "read", "musi/c", "pray", "workout"]
    let basicDomainname = ["a", "b", "c", "d", "e", "f", "g", "h"]
    // set the color scale
    const color = d3.scaleOrdinal()
        .domain(domainActivityName)
        .range(d3.schemeDark2);

    // Compute the position of each group on the pie:
    const pie = d3.pie()
        .sort(null) // Do not sort group by size
        //@ts-ignore
        .value(d => d.startTime)
    //@ts-ignore        
    // const data_ready = pie(Object.entries(data))
    const data_ready = pie(rawData)

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
        // .attr('fill', d => color(d.data[1]))
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

        return(
            <div>
                <h3> Cam Chart</h3>
                <p>IT should be under this</p>
                <div id="my_dataviz"></div>
            </div>
        )


}

export default Cam