__author__ = 'daan_ensing'

import pyen

en = pyen.Pyen("WKCIHDBJBZ3QEWWVA")

response = en.get('genre/list', bucket=['description'])
for g in response['genres']:
    print g['name'], '-', g['description']