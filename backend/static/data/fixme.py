import csv
import os


from django.conf import settings

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))


with open(
    os.path.join(__location__, 'service.csv'),
    'r',
    encoding='utf-8'
) as csv_file:
    reader = csv.reader(csv_file)
    # for i, row in enumerate(reader):
    #     if i == 0:
    #         continue
    #     row[0] = i

    with open(
        os.path.join(__location__, 'service2.csv'),
        'w',
        encoding='utf-8'
    ) as csv_file_w:
        writer = csv.writer(csv_file_w)
        for i, row in enumerate(reader):
            if i == 0:
                writer.writerow(row)
                continue
            row[0] = i
            writer.writerow(row)
