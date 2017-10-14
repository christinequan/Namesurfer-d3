import * as d3 from 'd3';

export default class Scales{
  constructor(x_domain, y_domain, chart_area, svg, current_data) {

    this.xScale = d3.scaleLinear()
               .domain(x_domain)
               .range([0, svg.width]);

    this.yScale = d3.scaleLinear()
                 .domain(y_domain)
                 .range([0, svg.height]);

    this.chart = chart_area;

    // year values
    const yearRange = d3.extent(current_data, d => d.year);
    const yearValues = d3.range(yearRange[0], yearRange[1], 10);

    this.xAxis = d3.axisTop(this.xScale).tickValues(yearValues).tickFormat(d3.format('d'));
    this.yAxis = d3.axisLeft(this.yScale);
  }

  drawAxes() {

    //draw the axes
    this.chart.append('g')
       .attr('class', 'x axis')
       .call(this.xAxis);

    this.chart.append('g')
       .attr('class', 'y axis')
       .call(this.yAxis);
  }

  reScaleYAxes(new_yScale){
    this.yScale.domain(new_yScale);
    this.chart.selectAll('y axis')
          .transition()
          .duration(1500)
          .ease(d3.easeLinear)
          .call(this.yAxis);
  }
}
