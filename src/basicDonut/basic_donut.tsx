import * as d3 from 'd3'


export function BasicDonut(){
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
const data = { a: 9, b: 20, c: 30, d: 8, e: 12, f: 3, g: 7, h: 14 }
// const data = [
//     { "number": 4, "name": "Locke" },
//     { "number": 8, "name": "Reyes" },
//     { "number": 15, "name": "Ford" },
//     { "number": 16, "name": "Jarrah" },
//     { "number": 23, "name": "Shephard" },
//     { "number": 42, "name": "Kwon" }
// ];

// set the color scale
const color = d3.scaleOrdinal()
    // .domain(
    //     (d3.extent(data, (d) => {
    //         return d.name
    //     }) as unknown) as string
    // )
    .domain(["a", "b", "c", "d", "e", "f", "g", "h"])
    .range(d3.schemeDark2);

// Compute the position of each group on the pie:
const pie = d3.pie()
    .sort(null) // Do not sort group by size
    //@ts-ignore
    .value(d => d[1])
    // .value((d) => d.value)

//@ts-ignore 
const data_ready = pie(data);

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
    .attr('fill', d => color(d.data[1]))
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
    .text(d => d.data[0])
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
        <div id="my_dataviz"></div>
    
    // <div>
    //     <p>header</p>
        
    //     {svg}
    //     <p>footer</p>
    // </div>
    
    )
}
    

    

