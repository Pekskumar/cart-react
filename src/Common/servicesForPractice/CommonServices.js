import moment from "moment";
const localTimezone = localStorage.getItem("timezone");
export const commonservices = {
  fnCheckValidationOfObject,
  getItem,
  createGuid,
  NewUTCFormat,
  BasicUTCTime,
  // getDecryptData,
  getLoginRoleData,
  setItem,
  getDayDateMonthTimeSeconds,
  getDayDateMonthTimeTransaction,
  SendTimeInFormat,
  getAgo,
  getDayDateMonthTimeWallet,
  getDayDateMonthTime,
  HidePassword,
  // getLoginUserData,
  getDateInFormat,
  getTimeInFormat,
  getDecryptData,
  getDayDateMonth,
  getHeadersFromData,
  getHeaders,
  getDateMOnthFormat,
  getDateInFormatCustom,
  // getAllUserData,s
};
const cryptoKey = "Mr._Pr@k@$h_27091992";

export const AppConfigData = {
  CryptoKey: cryptoKey,
};
// custom Validation for All Fields
export function fnCheckValidationOfObject(obj) {
  let IsValid = true;
  if (obj.errors !== null) {
    if (obj.errors.ValidationRules) {
      for (let i = 0; i < obj.errors.ValidationRules.length; i++) {
        obj.errors[obj.errors.ValidationRules[i].FieldName] = "";
      }

      for (let i = 0; i < obj.errors.ValidationRules.length; i++) {
        let objRules = obj.errors.ValidationRules[i];

        if (objRules !== null) {
          // Required validation :
          if (objRules.ValidationType.toLowerCase() === "required") {
            if (
              obj[objRules.FieldName] === "" ||
              obj[objRules.FieldName] === null ||
              obj[objRules.FieldName] === undefined
            ) {
              IsValid = false;
              obj.errors[objRules.FieldName] = objRules.ValidationMessage;
            }
          }

          if (
            obj[objRules.FieldName] !== "" &&
            obj[objRules.FieldName] !== null &&
            obj[objRules.FieldName] !== undefined
          ) {
            //  Range validation
            if (objRules.ValidationType.toLowerCase() === "range") {
              if (objRules.FieldName === "old_password") {
                if (obj.old_password.length < 6) {
                  IsValid = false;
                  obj.errors[objRules.FieldName] = objRules.ValidationMessage;
                }
              }
              if (objRules.FieldName === "new_password") {
                if (obj.new_password.length < 6) {
                  IsValid = false;
                  obj.errors[objRules.FieldName] = objRules.ValidationMessage;
                }
              }
            }

            // Masking Validation
            if (objRules.ValidationType.toLowerCase() === "mobile-mask") {
              // if (!obj[objRules.FieldName].toString().match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)) {
              if (!obj[objRules.FieldName].toString().match(/^[0-9]{10}$/)) {
                IsValid = false;
                obj.errors[objRules.FieldName] = objRules.ValidationMessage;
              }
            }

            // Email Validation
            if (
              obj.errors[objRules.FieldName] === "" &&
              objRules.ValidationType.toLowerCase() === "email"
            ) {
              var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
              if (!obj[objRules.FieldName].toString().match(mailformat)) {
                IsValid = false;
                obj.errors[objRules.FieldName] = objRules.ValidationMessage;
              }
            }

            //  Number validation
            if (
              objRules.ValidationType.toLowerCase() === "number" &&
              obj.errors[objRules.FieldName] === ""
            ) {
              var mailformat = /^[0-9]/;
              if (!obj[objRules.FieldName].toString().match(mailformat)) {
                IsValid = false;
                obj.errors[objRules.FieldName] = objRules.ValidationMessage;
              }
            }

            //  Compare Field Value

            if (
              obj.errors[objRules.FieldName] === "new_password" &&
              obj.errors[objRules.CompareFieldName] ===
                "confirm_new_password" &&
              objRules.ValidationType.toLowerCase() === "comparefieldvalue"
            ) {
              // var mailformat = /^[0-9]*$/;

              if (obj[objRules.FieldName] !== obj[objRules.CompareFieldName]) {
                IsValid = false;
                obj.errors[objRules.FieldName] = objRules.ValidationMessage;
              }
            }

            //date validation
            if (objRules.ValidationType.toLowerCase() === "date") {
              if (moment(obj[objRules.FieldName]) <= moment("1900-01-01")) {
                IsValid = false;
                obj.errors[objRules.FieldName] = objRules.ValidationMessage;
              }
            }
            if (objRules.ValidationType.toLowerCase() === "checkbox") {
              if (obj[objRules.FieldName].length === 0) {
                IsValid = false;
                obj.errors[objRules.FieldName] = objRules.ValidationMessage;
              }
            }
          }
        }
      }
    }
  }
  return { isValid: IsValid, obj: obj };
}

export function getItem(key) {
  let dataValues = localStorage.getItem(key) || "";
  return dataValues;
}

function getHeadersFromData() {
  return {
    // "Content-Type": "multipart/form-data",
    accept: "*/*",
    Authorization: "Bearer " + getItem("Token"),
  };
}

function getHeaders() {
  return {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: "Bearer " + getItem("Token"),
  };
}

// create Guid
function createGuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-4" +
    S4().substr(0, 3) +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  ).toLowerCase();
}

// encrypt data
// Crypto convert for userdata
function setItem(key, strString) {
  let CryptoJS = require("crypto-js");
  localStorage.setItem(key, CryptoJS.AES.encrypt(strString, cryptoKey));
}
// decrypt data
function getDecryptData(key) {
  let CryptoJS = require("crypto-js");
  let dataValues = localStorage.getItem(key) || "";
  let dataStr = "";
  if (dataValues !== "") {
    var bytes = CryptoJS.AES.decrypt(dataValues, cryptoKey);
    dataStr = bytes.toString(CryptoJS.enc.Utf8);
  }
  return dataStr;
}

// get user data
// function getLoginUserData() {
//   var data = [];
//   let dtstr = getDecryptData("Userdata");
//   if (dtstr !== "") {
//     data = JSON.parse(dtstr);
//   }
//   return data;
// }

// get user data
// function getAllUserData() {
//   var data = [];
//   let dtstr = getDecryptData("AllUserData");
//   if (dtstr !== "") {
//     data = JSON.parse(dtstr);
//   }
//   return data;
// }

// date Format
function getDateInFormat(date) {
  if (date !== null && date !== "" && date !== undefined)
    return moment(date).format("DD/MM/yyyy");
  else return "";
}
function getDateInFormatCustom(date, timezone, format) {
  if (date !== null && date !== "" && date !== undefined) {
    // if (date !== null && date !== "" && date !== undefined)
    //   return moment(date).format("HH:mm");
    // else return "";
    const utcTime = moment.utc(date, "YYYY-MM-DD HH:mm:ss");
    const localTimezone = localStorage.getItem("timezone");
    // Convert UTC time to local time
    const localTime = utcTime.tz(timezone == null ? localTimezone : timezone);
    // Format the local time as a string
    const formattedLocalTime = localTime.format(format);
    return formattedLocalTime;
  }
}

function getTimeInFormat(date) {
  if (date !== null && date !== "" && date !== undefined)
    return moment(date).format("DD-MM");
  else return "";
}

function getDayDateMonth(date) {
  if (date !== null && date !== "" && date !== undefined) {
    const utcTime = moment.utc(date, "YYYY-MM-DD HH:mm:ss");
    const localTimezone = localStorage.getItem("timezone");
    const localTime = utcTime.tz(localTimezone);
    const formattedLocalTime = localTime.format("dddd DD MMM");
    return formattedLocalTime;
  }
}
function getDayDateMonthTime(date) {
  if (date !== null && date !== "" && date !== undefined) {
    const utcTime = moment.utc(date, "YYYY-MM-DD HH:mm:ss");
    const localTimezone = localStorage.getItem("timezone");
    const localTime = utcTime.tz(localTimezone);
    const formattedLocalTime = localTime.format("dddd DD MMM | hh:mm A");
    return formattedLocalTime;
  }
}
function getDayDateMonthTimeSeconds(date) {
  if (date !== null && date !== "" && date !== undefined) {
    const utcTime = moment.utc(date, "YYYY-MM-DD HH:mm:ss");
    const localTimezone = localStorage.getItem("timezone");
    const localTime = utcTime.tz(localTimezone);
    const formattedLocalTime = localTime.format("YYYY-MM-DD HH:mm:ss");
    return formattedLocalTime;
  }
}
function getDayDateMonthTimeWallet(date) {
  if (date !== null && date !== "" && date !== undefined) {
    const utcTime = moment.utc(date, "YYYY-MM-DD HH:mm:ss");
    const localTimezone = localStorage.getItem("timezone");
    const localTime = utcTime.tz(localTimezone);
    const formattedLocalTime = localTime.format("ddd DD MMM | HH:mm");
    return formattedLocalTime;
  }
}
function getDayDateMonthTimeTransaction(date) {
  if (date !== null && date !== "" && date !== undefined) {
    const utcTime = moment.utc(date, "YYYY-MM-DD HH:mm:ss");
    const localTimezone = localStorage.getItem("timezone");
    const localTime = utcTime.tz(localTimezone);
    const formattedLocalTime = localTime.format("dddd DD MMM YYYY | HH:mm");
    return formattedLocalTime;
  }
}
function NewUTCFormat(date) {
  if (date !== null && date !== "" && date !== undefined) {
    const dateToConvert = new Date(date);
    const utcDate = new Date(
      dateToConvert.getUTCFullYear(),
      dateToConvert.getUTCMonth(),
      dateToConvert.getUTCDate(),
      dateToConvert.getUTCHours(),
      dateToConvert.getUTCMinutes(),
      dateToConvert.getUTCSeconds()
    );

    const utcDateString = utcDate.toISOString();

    return utcDateString;
  }
}
function BasicUTCTime(date) {
  if (date !== null && date !== "" && date !== undefined) {
    const dateToConvert = new Date(date);
    const utcDate = new Date(
      Date.UTC(
        dateToConvert.getUTCFullYear(),
        dateToConvert.getUTCMonth(),
        dateToConvert.getUTCDate(),
        dateToConvert.getUTCHours(),
        dateToConvert.getUTCMinutes(),
        dateToConvert.getUTCSeconds()
      )
    );

    const utcTimeString = utcDate.toISOString().split("T")[1]; // Extracting only the time part
    return utcTimeString;
  }
}

function getAgo(date) {
  if (date !== null && date !== "" && date !== undefined) {
    const utcTime = moment.utc(date);
    const localTimezone = localStorage.getItem("timezone");
    const localTime = utcTime.tz(localTimezone);

    return moment(new Date(localTime)).fromNow();
  }
}
function SendTimeInFormat(date) {
  // if (date !== null && date !== "" && date !== undefined)
  //   return moment(date).format("HH:mm");
  // else return "";
  const utcTime = moment.utc(date, "YYYY-MM-DD HH:mm:ss");
  const localTimezone = localStorage.getItem("timezone");
  // Convert UTC time to local time
  const localTime = utcTime.tz(localTimezone);
  // Format the local time as a string
  const formattedLocalTime = localTime.format("YYYY-MM-DD HH:mm:ss");
  return formattedLocalTime;
}
// date Format for body
function getDateMOnthFormat(date) {
  if (date !== null && date !== "" && date !== undefined)
    return moment(date).format("DD-MM");
  else return "";
}

// HidePassword
function HidePassword(password) {
  let str = "";
  if (password !== "" && password !== null && password !== undefined) {
    for (let i = 0; i < password.length; i++) {
      str = str + "*";
    }
  }
  return str;
}

function getLoginRoleData(PageName, ActionType) {
  let IsValidAction = false;
  var roledata = [];
  let roledataStr = getItem("roleData");

  if (roledataStr !== "") {
    roledata = JSON.parse(roledataStr);
    for (let i = 0; i < roledata.length; i++) {
      if (
        roledata[i].RightName.toUpperCase() ===
        PageName.toUpperCase().replace(" ", "")
      ) {
        if (ActionType.toUpperCase() === "ISVIEW") {
          return roledata[i].IsView === 1 ? true : false;
        } else if (ActionType.toUpperCase() === "ISCREATE") {
          return roledata[i].IsCreate === 1 ? true : false;
        } else if (ActionType.toUpperCase() === "ISDELETE") {
          return roledata[i].IsDelete === 1 ? true : false;
        } else if (ActionType.toUpperCase() === "ISDOWNLOAD") {
          return roledata[i].IsDownload === 1 ? true : false;
        } else if (ActionType.toUpperCase() === "ISUPDATE") {
          return roledata[i].IsUpdate === 1 ? true : false;
        }
      }
    }
  }

  return IsValidAction;
}