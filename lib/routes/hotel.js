const hotelSchema = require("../schema/hotel");
const hotelHandler = require("../handlers/hotel");

const deafultUrl = "/hotel";

module.exports = [
    {
        method: "POST",
        url: `${deafultUrl}/create`,
        auth:false,
        handler:hotelHandler.createHotel,
        schema: {
            description: "get hotel",
            tags: ["hotel"],
            body: hotelSchema.hotelListReq
        }
    },
    {
        method: "GET",
        url: `${deafultUrl}/getList`,
        auth:false,
        handler:hotelHandler.getHotels,
        schema: {
            description: "create hotel",
            tags: ["hotel"]
        }
    }
]