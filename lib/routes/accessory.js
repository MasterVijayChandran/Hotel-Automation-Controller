const accessorySchema = require("../schema/accessory");
const commonSchema = require("../schema/common");
const accessoryHandler = require("../handlers/accessory");

const deafultUrl = "/accessory";

module.exports = [
    {
        method: "PUT",
        url: `${deafultUrl}/update`,
        auth: false,
        handler: accessoryHandler.update,
        schema: {
            description: "update accessory",
            tags: ["accessory"],
            body: accessorySchema.accessoryReq
        }
    }
]