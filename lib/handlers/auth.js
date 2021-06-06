const jwt = require("jsonwebtoken");
const appConfig = require('../../config/app');
let authHandler = {};

//validate Basic auth for public apis
authHandler.basicValidate = (username, password, req, reply, done) => {
    username == appConfig.basic_uname && password == appConfig.basic_pw
      ? done()
      : done(new Error("Authorization token is required"));
};

authHandler.validateSession = (req, reply, done) => {
  try {
    if (!req.headers || !req.headers.authorization) {
      return done(resMsg.AUTH_REQUIRED);
    } else {
      let decoded = jwt.verify(
        req.headers.authorization,
        appConfig.jwt_secret
      );
      done();
    }
  } catch (err) {
    return done(resMsg.INVALID_AUTH);
  }
};

module.exports = authHandler;