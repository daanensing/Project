__author__ = 'daan_ensing'

import pyen

en = pyen.Pyen("WKCIHDBJBZ3QEWWVA")

genre = 'detroit house'
response = en.get('genre/artists', name=genre)
for artist in response['artists']:
    print artist['name']