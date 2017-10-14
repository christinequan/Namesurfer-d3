import * as d3 from 'd3';

export function csv_to_map(file_dir) {
  let data_obj = {};
  d3.csv(file_dir, function(error, dataset) {

    if (error) throw error;

    dataset.forEach(function(d) {
      const key = d.name;
      delete d.name;
      delete d.gender;

      data_obj[key] = d;

    });
  })
  return data_obj;
}
