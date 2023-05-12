export function formatDateTimeToDate(date) {
    let offset = date.getTimezoneOffset()
    let newDate = new Date(date.getTime() - (offset*60*1000))
    return newDate.toISOString().split('T')[0]
}

export function formatDateTimeToTime(date) {
    // let offset = date.getTimezoneOffset()
    // let newDate = new Date(date.getTime() - (offset*60*1000))
    return date.split('T')[1].slice(0, 5)
}
