from datetime import timedelta, datetime


class DateConverter:
    regex = '\d{4}-\d{2}-\d{2}'

    def to_python(self, value):
        return datetime.strptime(value, '%Y-%m-%d')

    def to_url(self, value):
        return value
    
    
def get_datetimes(start_date, finish_date, start_time, finish_time, INTERVAL):
    start_date = datetime.combine(start_date, start_time)
    finish_date = datetime.combine(finish_date, finish_time)
    dates = [start_date + timedelta(days=x)
             for x in range(0, (finish_date-start_date).days + 1)]

    datetimes = []
    for dt in dates:
        while dt.time() < finish_time:
            datetimes.append(dt)
            dt += timedelta(minutes=INTERVAL)

    return datetimes