module.exports = {
  INVALID_AUTH: { statusCode: 401, message: "Invalid authorization" },
  AUTH_REQUIRED: { statusCode: 401, message: "Authorization required" },
  SUCCESS: { statusCode: 200, message: "Success" },
  FAILED: { statusCode: 200, message: "Failed" },
  NOT_PROCESS_TIME: { statusCode: 200, message: "Unable To Process at This Time" },
  UNABLE_TO_ON: { statusCode: 200, message: "Unable To ON at This Time" },
  INTERNAL_SERVER_ERROR: { statusCode: 500,message: "Internal server error occurred"},
};
