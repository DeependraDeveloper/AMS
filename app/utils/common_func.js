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
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== "" && email.match(emailFormat)) {
        return true;
    }

    return false;
};

export let isPhone = function (phone) {
    var phoneFormat = /^[6-9]\d{9}$/;

    if (phone !== "" && phone.match(phoneFormat)) {
        return true;
    }

    return false;
};

export let isPassword = function (str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;
    return re.test(str);
};

export function convertUTCtoIST(utcDateTime) {
    var date = new Date(utcDateTime);

    // Convert to IST by adding 5 hours and 30 minutes
    date.setUTCHours(date.getUTCHours() + 5);
    date.setUTCMinutes(date.getUTCMinutes() + 30);

    // Format the date
    var year = date.getUTCFullYear();
    var month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    var day = date.getUTCDate().toString().padStart(2, "0");

    // Format the time
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var seconds = date.getUTCSeconds();

    // Convert to 12-hour format
    var period = "AM";
    if (hours >= 12) {
        period = "PM";
        if (hours > 12) {
            hours -= 12;
        }
    }

    // Format the IST date and time as a string
    var istDateTime =
        day +
        "-" +
        month +
        "-" +
        year +
        " " +
        hours.toString().padStart(2, "0") +
        ":" +
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0") +
        " " +
        period;

    return istDateTime;
}

export function getHours(startDate, endDate) {
    // Calculate the difference in milliseconds
    const diffInMs = endDate.getTime() - startDate.getTime();

    // Convert milliseconds to hours
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    return diffInHours;
}