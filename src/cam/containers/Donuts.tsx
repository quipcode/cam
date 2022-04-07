import * as React from 'react'
import { useContext } from 'react';
import { CamContextType, ICam, ICamColor, CamColorContextType } from '../@types/cam'
import { CamContext } from '../context/camContext'
import { CamColorContext } from '../context/camColorContext'
import Cam from '../components/Cam'
import * as d3 from 'd3'

const Donuts = () => {
    // const { cams, updateCam } = useContext(CamContext) 
    const { colors, updateColor } = React.useContext(CamColorContext) as CamColorContextType;
    // const [activityColor, setActivityColor] = React.useState<ICamColor[]>([{}])
    let coloredActivityName: string[] = [], associatedColor: string[] = []
    colors.forEach((v) => {
        coloredActivityName.push(v.momentName!)
        associatedColor.push(v.colorHexCode!)
    })  
    // let gappedCams = makingGaps(cams)


    // set the dimensions and margins of the graph
    const width = 450,
        height = 450,
        margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    const svg = d3.select("#dataviz")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(coloredActivityName)
        .range(associatedColor);

    // Compute the position of each group on the pie:
    const pie = d3.pie()
        // .sort(null) // Do not sort group by size
        .sort((a, b) => b.valueOf() - a.valueOf())
        //@ts-ignore
        .value(d => d.duration)
    //@ts-ignore
    const data_ready = pie(cams)

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
        .attr('fill', d => color(d.data.momentName))
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
        .text(d => d.data.momentName)
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
    
    svg.on("click", function(event){
        var mouse = d3.pointer(this)
        console.log(event.target.__data__.data)
    })

    return (
        <>
            {/* {console.log(cams, colors, associatedColor, coloredActivityName)} */}
            
            {/* {console.log(cams, data_ready, activityColor)} */}
            <div id="dataviz"></div>
            {/* {cams.map((cam: ICam) => {

                return (<Cam key={cam.momentId} updateCam={updateCam} cam={cam} />)

            })} */}
        </>
    )
}

export default Donuts