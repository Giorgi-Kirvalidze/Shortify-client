exports.formValid = ({ isError, ...rest }) => {
    let isValid = false;
    if (isError === undefined) {
        return isValid = true
    }
    Object.values(isError).forEach(val => {
        if (val.length > 0) {
            isValid = false
        } else {
            isValid = true
        }
    });

    Object.values(rest).forEach(val => {
        if (val === null) {
            isValid = false
        } else {
            isValid = true
        }
    });

    return isValid;
};