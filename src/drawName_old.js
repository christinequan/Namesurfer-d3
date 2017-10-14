import * as d3 from 'd3';

export function drawName(svg, current_data, chart) {
    // define scales
    const xScale = d3.scaleLinear()
               .domain(d3.extent(current_data, d => +d.year))
               .range([0, svg.width]);
    // console.log(d3.extent(current_data, d => d.year));

    const yScale = d3.scaleLinear()
               .domain([0,d3.max(current_data, d=> +d.rank)])
               .range([0, svg.height]);


    // year values
    const yearRange = d3.extent(current_data, d => d.year);
    const yearValues = d3.range(yearRange[0], yearRange[1], 10);

    //draw the axes
    chart.append('g')
       .attr('class', 'x axis')
       .call(d3.axisTop(xScale).tickValues(yearValues).tickFormat(d3.format('d')));

    chart.append('g')
       .attr('class', 'y axis')
       .call(d3.axisLeft(yScale));

    //draw lines
    let line = d3.line() // line generator
                 .x(d => xScale(d[0]))
                 .y(d => yScale(d[1]));

    //sort data or you will get funky line from generator
    current_data.sort((a,b) => {
      return d3.ascending(+a.year, +b.year);
    });

    const line_data = current_data.map(val =>[val.year, val.rank]);

    chart.append('path')
       .datum(line_data)
       .attr('class', 'line')
       .attr('d', line)

    //draw dots
    // chart.selectAll('dots')
    //    .data(current_data)
    //    .enter()
    //    .append('circle')
    //    .attr('class', 'dot')
    //    .attr('cx', d => xScale(+d.year))
    //    .attr('cy', d => yScale(+d.rank))
    //    .attr('r', 2);

}
