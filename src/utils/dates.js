export function format(date) {
    const timeStamp = dateWithOutTime(date);
    return `${timeStamp.getDate()}-${timeStamp.getMonth() + 1}-${timeStamp.getFullYear()}`
}

export function is_today(date) {
    return format(date) === format(new Date());
}

export function isTodayOrGreather(date) {
    return dateWithOutTime(date) <= new Date();
}

    function  dateWithOutTime(date) {
    const formatDate = date.split(/-|T.*/);
    return new Date(formatDate[0], formatDate[1] -1 , formatDate[2]);
}