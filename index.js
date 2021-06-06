const appConfig = require('./config/app')
const Ajv = require("ajv");
const utils = require("./lib/utils/utils");
const authHandler = require("./lib/handlers/auth");
const fastify = require('fastify')({
    logger: true,
    logLevel: appConfig.logger_level
  })
const routes = require('./lib/routes')
require("./config/db");
fastify.register(require("fastify-swagger"), appConfig.swagger_options)
fastify.register(require("fastify-cors"), appConfig.cors_options);


//add hooks with relevant handlers
fastify.addHook("preHandler", utils.formReqData);
fastify.addHook("onError", utils.handleError);
fastify
.decorate("validateSession", authHandler.basicValidate)
.register(require("fastify-auth"))
// .register(require('fastify-knex'),
    // appConfig.db_config)
.after(()=>{
    routes.registerRoutes(fastify);
})
global.logger = fastify.log;

const ajv = new Ajv({
  // the fastify defaults (if needed)
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  allErrors: true
});

//set fastify default schema compiler
fastify.setValidatorCompiler(({ schema, method, url, httpPart }) => {
    return ajv.compile(schema)
})

//handle unhandled exception
process.on("uncaughtException", err => {
    logger.error(err);
});

const start = async () => {
    try{
        await fastify.listen(appConfig.server);
    } catch (err) {
        logger.error(err);
        process.exit(1);
    }
};

start();
