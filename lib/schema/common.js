let common = {};

common.status = {
  200: {
    type: "object",
    properties: {
      statusCode: { type: "number" },
      message: { type: "string" }
    },
    required: ["statusCode", "message"]
  }
};

module.exports = common;