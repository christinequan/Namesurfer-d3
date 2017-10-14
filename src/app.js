import * as d3 from 'd3';
import SVG_dimensions from './svg';
import {drawName} from './drawName';
import {headshakeCallback} from './animations';
import {maxRank, maxArray} from './max';
import Scales from './scales';

// READ IN THE csv
const file_dir = './data/rank_toy.json';

////////////////////////////////
d3.json(file_dir, function(error, dataset) {

  if (error) throw error;

  let current_name = "Taylor";
  let current_data = dataset[current_name];
  let max_rank = [maxRank(current_data)];

  // reformat time
  const yearParse = d3.timeParse('%Y');
  const yearFormat = d3.timeFormat('%Y');
  current_data.forEach(d => {
    d.year = yearFormat(yearParse(d.year));
    d.rank = +d.rank;
    return d
  });
  // console.log(typeof(current_data[0].year));

  //dimensions of svg
  let svg = new SVG_dimensions('chart');

  // start drawing chart
  // inspiration: https://bl.ocks.org/pstuffa/26363646c478b2028d36e7274cedefa6
  const chart_area = d3.select('#chart')
                .append("g")
                .attr("transform", "translate(" + svg.margin_x + "," + svg.margin_y + ")");

  let x_domain = d3.extent(current_data, d => +d.year);
  let y_domain = [0,d3.max(current_data, d=> +d.rank)];

  let scales = new Scales(x_domain, y_domain, chart_area, svg, current_data);
  scales.drawAxes();
  // drawName(svg, current_data, chart_area);

  // on clear
  const clear = document.getElementById('clear');
  clear.addEventListener('click', function(){
    console.log('clear');
    chart_area.selectAll('.dot, .line').remove();
  });

  //on click
  const form_text = document.getElementById('query-input');

  form_text.addEventListener('focus', (event) => {
    event.preventDefault();
    form_text.placeholder = '';
    form_text.value = '';
  });

  //resize on window change
  window.addEventListener('resize', function(){
    chart_area.selectAll('*').remove();
    svg = new SVG_dimensions('chart');
    drawName(svg, current_data, chart_area);
  });

  const submit = document.getElementById('search');
  submit.addEventListener('submit', function(event){
    event.preventDefault();
    current_name = document.getElementById('query-input').value;

    if (current_name !== undefined) { //changing cases
      current_name = current_name[0].toUpperCase() + current_name.slice(1).toLowerCase();
    }

    if (current_name in dataset) {
      current_data = dataset[current_name];
      drawName(svg, current_data, chart_area)
    } else {
      console.log('No such name exists');
      headshakeCallback(form_text);
    }

  });

//TODO Separate out scales and graphs
  //TODO scales animate
  //TODO Animate line transitions
  //TODO different colors for the graphs


})
