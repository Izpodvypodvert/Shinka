export function formatDateTimeToDate(date) {
    let offset = date.getTimezoneOffset()
    let newDate = new Date(date.getTime() - (offset*60*1000))
    return newDate.toISOString().split('T')[0]
}

export function formatDateTimeToRuDate(date) {
    let offset = date.getTimezoneOffset()
    let newDate = new Date(date.getTime() - (offset*60*1000))
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return newDate.toLocaleDateString('ru-RU', options)
}

export function formatDateTimeToTime(date) {
    // let offset = date.getTimezoneOffset()
    // let newDate = new Date(date.getTime() - (offset*60*1000))
    return date.split('T')[1].slice(0, 5)
}
