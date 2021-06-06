const hotelSchema = require("../schema/hotel");
const commonSchema = require("../schema/common");
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
            body: hotelSchema.hotelListReq,
            response:commonSchema.status
        }
    },
    {
        method: "GET",
        url: `${deafultUrl}/getList`,
        auth:false,
        handler:hotelHandler.getHotels,
        schema: {
            description: "get hotel",
            tags: ["hotel"],
            response:commonSchema.status
        }
    },{
        method: "GET",
        url: `${deafultUrl}/getHotelById`,
        auth:false,
        handler:hotelHandler.getHotelById,
        schema: {
            description: "get hotel by id",
            tags: ["hotel"],
            params: hotelSchema.hotelGetReq,
            response:commonSchema.status
        }
    }
]