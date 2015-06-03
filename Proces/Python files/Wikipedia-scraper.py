#!/usr/bin/env python
# Name: Daan Ensing
# Student number: 10003216
'''
This script scrapes Wikipedia for a list of all electronic music genres.
'''

from pattern.web import URL, DOM, plaintext
import json

TARGET_URL = "http://nl.wikipedia.org/wiki/Lijst_van_elektronische-muziekgenres"
BACKUP_HTML = 'wikipedia-genres.html'


def extract_info(dom):
    '''
    Extract a list genres.

    Each genre contains the following fields:
    - Name
    - Wikipedia link (if present)
    '''

    for elements in dom.by_tag("body"):
        content =  elements.by_id("content")
        for elements in content:
            content2 = content.by_id("bodyContent")
            for elements in content2:
                content3 = content2.by_id("mw-content-text")
                for elements in content3:
                    content4 = content3[2]


    print plaintext(content4.content)

    # start_list = []
    #
    # table = dom.by_tag("tr")
    # for rows in table:
    #     paragraphs =  rows.by_tag("p")
    #     for text in paragraphs:
    #         info = text.by_tag("tr")
    #         for variables in info:
    #             test_list = []
    #             test_list.append(plaintext(variables.content))
    #             start_list.append(test_list)
    #
    # del start_list[:3]
    #
    # i = 0
    #
    # data_list = []
    #
    # for x in range(len(start_list)):
    #     for items in start_list[i]:
    #         temp_list = items.split()
    #         data_list.append(temp_list[:4])
    #         data_list[i].append(temp_list[-1])
    #         i += 1
    #
    # j = 0
    #
    # final_list = []
    #
    # for x in range(len(start_list)):
    #     temp_dict = {}
    #     date = data_list[j][0]
    #     time = data_list[j][1]
    #     latitude = data_list[j][2]
    #     longitude = data_list[j][3]
    #     energy = data_list[j][4]
    #     temp_dict.update({"Date": date,
    #                      "Time": time,
    #                      "Latitude": latitude,
    #                      "Longitude": longitude,
    #                      "Energy": energy})
    #     final_list.append(temp_dict)
    #     j += 1
    #
    # return final_list

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the information
    genres = extract_info(dom)

    # parse and write to JSON
    out = json.dumps(genres)
    f = open("wikipedia-genres.json", "w")
    f.write(out)

