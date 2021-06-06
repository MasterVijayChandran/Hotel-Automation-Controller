"use strict";

let utils = {};

//form  post req data
utils.formReqData = (req, reply, done) => {
  done();
};

//process response Object
utils.formResData = (req, reply, done) => {
  done();
};

//process error object
utils.handleError = (req, reply, error, done) => {
  console.log("error", error);

  done();
};

/**
 * @param {Object} data - data to  form the response
 */

utils.formSuccessObject = (statusCode, message, data) => {
  let succssObj = {
    statusCode: statusCode ? statusCode : 200,
    message: message ? message : "Success"
  };

  if (data) {
    succssObj["data"] = data;
  }

  return succssObj;
};

/**
 * @param {Object} err - err to  form the response
 */
utils.formErrorObject = (statusCode, message, err) => {
  const errorObj = {
    statusCode: statusCode ? statusCode : 500,
    message: message ? message : "Failed",
    isError: true
  };

  if (err) {
    errorObj["err"] = err; //error object contains actual error details
  }
  console.log("errorObj", errorObj);

  return errorObj;
};
module.exports = utils;