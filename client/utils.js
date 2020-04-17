const timeFormat = (time, type) => {
    time = typeof time === 'object' ? time : new Date(time);
    let month = time.getMonth() + 1,
        day = time.getDate(),
        year = time.getFullYear(),
        hour = time.getHours(),
        minute = time.getMinutes(),
        second = time.getSeconds(),
        timeStamp = time.getTime(),
        date = time.toDateString(),
        currTime = new Date(),
        currDate = currTime.toDateString();

    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    if(date === currDate) {
        return `${hour}:${minute}`;
    } else {
        const offset = ((hour * 60 * 60 + minute * 60 + second) + (24 * 60 * 60)) * 1000;
        if(timeStamp + offset > +currTime) {
            return type === 'short' ? `昨天` : `昨天${hour}:${minute}`;
        } else {
            return type === 'short' ? `${year}/${month}/${day}` : `${year}/${month}/${day} ${hour}:${minute}`;
        }
    }
};

const checkNickname = input => {
    return /^([\w_-]|[\u4e00-\u9fa5]){1,25}$/.test(input);
};
const checkEmail = input => {
    return /^([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(input);
};
const checkPwd = input => {
    return input.length >= 6 && input.length <= 25;
};

export {
    timeFormat,
    checkNickname,
    checkEmail,
    checkPwd
};