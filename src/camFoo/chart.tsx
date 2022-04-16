import React from 'react';
import * as d3 from 'd3';
import {useD3} from './useD3'
import {Types} from './types'
import { useCam } from './useCam'

function Chart({data} : any){
    const { cam, camForm, setCam, doubleCam, setCamForm } = useCam();
    console.log("inchart", cam)
    const ref = useD3(

        (svg : any) => {

            const height = 500;

            const width = 500;

            // const margin = { top: 20, right: 30, bottom: 30, left: 40 };
            const margin  = 40;
            const radius = Math.min(width, height) / 2 - margin

            // append the svg object to the div called 'my_dataviz'
            svg = d3.select(".plot-area")
                // const svg = d3.select("#my_dataviz")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2},${height / 2})`);
            let domainActivityName = ["hygiene", "golf", "read", "musi/c", "pray", "workout"]
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
            const data_ready = pie(cam.data)

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
                //@ts-ignore
                .attr('transform', function (d) {
                    //@ts-ignore
                    const pos = outerArc.centroid(d);
                    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                    pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                    return `translate(${pos})`;
                })
                //@ts-ignore
                .style('text-anchor', function (d) {
                    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                    return (midangle < Math.PI ? 'start' : 'end')
                })
            svg
                .on("click", function (event: any) {
                    let activity = event.target.__data__.data
                    // console.log(activity)
                    let startTime = parseInt(activity["startTime"].toString())
                    let endTime = parseInt(activity["endTime"].toString())
                    let activityName = activity["activityName"].toString()
                    let activityId = activity["activityId"]
                    setCamForm({
                        activityId: activityId,
                        startTime: startTime,
                        endTime: endTime,
                        activityName: activityName,
                        duration: 0,
                        dayStart: 0,
                        dayEnd: 0
                        // establishCamForm() {
                        //     console.log("hi")
                        // }
                    })
                })

        },

        [cam.data]

    );

    return (
        <div>
        <svg
            style={{
                height: 500,
                width: "100%",
                marginRight: "0px",
                marginLeft: "0px",
            }}
        >
            <g className="plot-area" />
        </svg>
        </div>
    );

}


export default Chart;