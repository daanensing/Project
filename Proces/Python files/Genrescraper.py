__author__ = 'daan_ensing'

import json
from pprint import pprint

with open("all-music-genres.json") as data_file:
    data = json.load(data_file)
    data_file.close()

with open('house-techno-genres.json') as check_file:
    check = json.load(check_file)
    check_file.close()

data_list = []
for x in data:
    data_list.append(x['name'])

check_list = []
for y in check:
    check_list.append(y['Genre'].lower())


