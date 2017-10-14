import csv

data_map = {}

with open('data/girls.csv', 'r') as csvfile:
    reader = csv.DictReader(csvfile)

    for line in reader:
        key = [line['name'], line['gender']]
        line.pop('name', None)
        line.pop('gender', None)
        data_map[key] = line

print(data_map[["Christine, F"]])
