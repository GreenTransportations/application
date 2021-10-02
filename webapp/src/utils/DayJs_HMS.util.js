import * as dayjs from 'dayjs';

export const DayJs_HMS = (trip) => {

    const h = dayjs(trip.endTime).diff(dayjs(trip.startTime), 'hour');
    const m = dayjs(trip.endTime).diff(dayjs(trip.startTime), 'minute') - 
                dayjs(trip.endTime).diff(dayjs(trip.startTime), 'hour')*60;
    return String(h) + " H " + String(m) + " M";
}