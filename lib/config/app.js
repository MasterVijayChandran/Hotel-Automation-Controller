module.exports = {
    server:{
        host: process.env.HOST ? process.env.HOST : "localhost",
        port: process.env.PORT ? process.env.PORT : "5000" 
    },
    logger_level: process.env.LOGGER_LEVEL ? process.env.LOGGER_LEVEL : "debug",
    jwt_secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "testSecret",
    basic_uname: process.env.BASIC_UNAME ? process.env.BASIC_UNAME : "vijay",
    postgres_host: process.env.POSTGRES_HOST ? process.env.POSTGRES_HOST : "localhost",
    postgres_port: process.env.POSTGRES_PORT ? process.env.POSTGRES_PORT : "5432",
    postgres_uname: process.env.POSTGRES_USERNAME ? process.env.POSTGRES_USERNAME : "postgres",
    postgres_pw: process.env.POSTGRES_PASSWORD ? process.env.POSTGRES_PASSWORD : "vijay@123",
    postgres_db: process.env.POSTGRES_DATABASE ? process.env.POSTGRES_DATABASE : "postgres",
    db_config:{
        client: "pg",
        version: "11.2",
        connection: {
          host: process.env.POSTGRES_HOST || "localhost",
          port: process.env.POSTGRES_PORT || "5432",
          user: process.env.POSTGRES_USERNAME || "postgres",
          password: process.env.POSTGRES_PASSWORD || "vijay@123",
          database: process.env.POSTGRES_DATABASE || "postgres"
        }
    },
    swagger_options: {
        exposeRoute: true,
        routePrefix: "/api/documentation",
        swagger: {
          host: `${process.env.POSTGRES_HOST || "localhost"}:${process.env.POSTGRES_PORT || "5432"}`,
          info: {
            title: "Mahindra Shuttl",
            description: "Shuttl api swagger documentation",
            version: process.env.VERSION
          },
          consumes: ["application/json"],
          produces: ["application/json"],
          tags: [
            { name: "health", description: "Testing related end-points" },
            { name: "order", description: "User related end-points" }
          ]
        }
    }
}