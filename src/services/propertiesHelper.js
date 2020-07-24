export function checkIsObjectHasRequiredProperties(arrayOfRequiredProperties, objectToCheck) {
    if (!Array.isArray(arrayOfRequiredProperties)) {
        throw new Error("arrayOfRequiredProperties is an array")
    }
    if (typeof objectToCheck !== "object" && !(objectToCheck instanceof Array)) {
        throw new Error("objectToCheck is a object")
    }
    for (let i = 0; i < arrayOfRequiredProperties.length; i++) {
        if (typeof arrayOfRequiredProperties[i] !== "string") {
            throw new Error("arrayOfRequiredProperties is array with strings only")
        }
        let isInside = false;
        for (let key in objectToCheck) {
            if (arrayOfRequiredProperties[i] === key) {
                isInside = true;
            }
        }
        if (!isInside) {
            return false
        }
    }
    return true
}

export function checkIsObjectHasOnlyAllowProperties(arrayOfAllowProperties, objectToCheck) {
    if (!Array.isArray(arrayOfAllowProperties)) {
        throw new Error("arrayOfRequiredProperties is no an array")
    }
    if (typeof objectToCheck !== "object" && !(objectToCheck instanceof Array)) {
        throw new Error("objectToCheck is not a object")
    }
    for (let key in objectToCheck) {
        if (arrayOfAllowProperties.includes(key) === false) {
            return false
        }
    }
    return true
}