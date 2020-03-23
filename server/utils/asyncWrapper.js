const asyncWrapper = promise => {
    return promise
        .then(res => [null, res])
        .catch(err => [err, null]);
}

module.exports = asyncWrapper;