let DateBetween = function (startDate, endDate) {
    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let distance = endDate - startDate;

    if (distance < 0) {
        return false;
    }

    let days = Math.floor(distance / day);
    let hours = Math.floor((distance % day) / hour);
    let minutes = Math.floor((distance % hour) / minute);
    let seconds = Math.floor((distance % minute) / second);


    let between = [];

    days > 0 ? between.push(`${days}`) : between.push(false);
    hours >= 0 ? between.push(`${hours < 10 ? `0${hours}` : hours}`) : between.push(false);
    minutes >= 0 ? between.push(`${minutes < 10 ? `0${minutes}` : minutes}`) : between.push(false);
    seconds >= 0 ? between.push(`${seconds < 10 ? `0${seconds}` : seconds}`) : between.push(false);
    return between

}


module.exports = DateBetween;
