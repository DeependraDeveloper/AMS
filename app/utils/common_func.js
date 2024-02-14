import mongoose from "mongoose";

export let isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

export let isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length !== 0;
};

export let isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
};

export let isEmail = function (email) {
    email = String(email).trim().toLowerCase();
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== "" && email.match(emailFormat)) {
        return true;
    }

    return false;
};

export let isPhone = function (phone) {
    phone = String(phone).trim().toLowerCase();
    var phoneFormat = /^[6-9]\d{9}$/;

    if (phone !== "" && phone.match(phoneFormat)) {
        return true;
    }

    return false;
};

export let isPassword = function (str) {
    str = String(str).trim().toLowerCase();
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;
    return re.test(str) ? true : false;
};

export function calculateTimeDifference(time1, time2) {
    function timeToSeconds(time) {
        const [hours, minutes, seconds, meridiem] = time.split(/:| /);
        const totalSeconds = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
        return meridiem === 'PM' ? totalSeconds + 12 * 3600 : totalSeconds;
    }

    const seconds1 = timeToSeconds(time1);
    const seconds2 = timeToSeconds(time2);

    let differenceSeconds = Math.abs(seconds2 - seconds1);

    // Calculate hours
    const hours = Math.floor(differenceSeconds / 3600);
    differenceSeconds %= 3600;

    // Calculate minutes
    const minutes = Math.floor(differenceSeconds / 60);
    differenceSeconds %= 60;

    // Seconds remaining
    const seconds = differenceSeconds;

    return `${hours}:${minutes}:${seconds}`;
}

