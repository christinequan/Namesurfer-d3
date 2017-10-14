// takes a dataset from d3.read_csv and returns
// the same dataset but uses a key as the column naem

export function make_column_key(dataset, column_name) {
  let data_obj = {};
  dataset.forEach(function(d){
    const key = d[column_name];
    delete d[column_name];

    data_obj[key] = d;
  })
  console.log(Object.keys(data_obj).length);
  return data_obj;
}
