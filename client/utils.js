const timeFormat = time => {
    time = new Date(time);
    //const offset = 8 * 60 * 60 * 1000;
    //const time = new Date(new Date(date).getTime() - offset);
    let month = time.getMonth() + 1,
        day = time.getDate(),
        year = time.getFullYear(),
        hour = time.getHours(),
        minute = time.getMinutes(),
        second = time.getSeconds(),
        timeStamp = time.getTime(),
        currTime = +new Date();
    if(currTime - timeStamp < 86400000) {
        hour = hour >= 10 ? hour : '0' + hour;
        minute = minute >= 10 ? minute : '0' + minute;
        return `${hour}:${minute}`;
    } else {
        return `${year}/${month}/${day}`;
    }
};

const checkNickname = input => {
    return /^(\w){1,25}$/.test(input);
};
const checkEmail = input => {
    return /^([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(input);
};
const checkPwd = input => {
    return /^(\w){6,25}$/.test(input);
};

export {
    timeFormat,
    checkNickname,
    checkEmail,
    checkPwd
};