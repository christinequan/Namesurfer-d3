import csv
import json

def main():
    filename = './data/bbnames_rankspreadtoy.csv'
    data_arr = read_data(filename)

    outfile = './data/rank_toy.json'
    with open(outfile, 'w') as outf:
        json.dump(data_arr, outf, separators=(',', ': '), sort_keys=True)

def read_data(filename):
    with open(filename, 'r') as f:
        reader = csv.DictReader(f)
        data_arr = {}

        for line in reader:
            key = line['name']
            del line['name']
            name_entry = spread_obj_to_array(line)
            data_arr[key] = name_entry


    return data_arr


# takes a line and parses it return a dictionary key: {object}
# removes the gender column
def parse_data(line):

    year_count = spread_obj_to_array(line)
    return year_count

# takes a single object and spreads into an array of arrays
def spread_obj_to_array(obj):
    final_arr = []
    for key in obj.keys():
        scatter_dot = dict()
        scatter_dot['year'] = key
        scatter_dot['rank'] = obj[key]
        final_arr.append(scatter_dot)
    return final_arr


if __name__ == '__main__':
    main()
