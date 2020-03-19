const timeFormat = time => {};

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
    checkNickname,
    checkEmail,
    checkPwd
};