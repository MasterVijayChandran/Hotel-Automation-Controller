module.exports = {
  INVALID_AUTH: { statusCode: 401, message: "Invalid authorization" },
  AUTH_REQUIRED: { statusCode: 401, message: "Authorization required" },
  SUCCESS: { statusCode: 200, message: "Success" },
  FAILED: { statusCode: 200, message: "Failed" },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: "Internal server error occurred"
  },
};
