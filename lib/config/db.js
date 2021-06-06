"use strict";

const appConfig = require("./app");

let knex = require("knex")(appConfig.db_config);

knex.raw("select now()").then((res)=>{
    console.log("DB running on",res.rows[0]);
});

module.exports = knex;