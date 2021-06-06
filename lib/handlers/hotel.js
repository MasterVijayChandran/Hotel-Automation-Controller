const commonResMsg = require("../responseMsg/common");
const hotelModel = require("../models/hotel");


let hotel = {};

hotel.createHotel = async (req, reply) => {
    try {
        let request = req.body;
        let meta = []
        request.floors.forEach(element => {
            meta.push(element);
        });
        request.meta = JSON.stringify(meta);
        delete request.floors;
        const responseData = await hotelModel.create(request);
        if(responseData)
            reply.send(commonResMsg.SUCCESS);
        else
            reply.send(commonResMsg.FAILED);
    } catch (err) {
        console.log("err", err);
        reply.send(commonResMsg.INTERNAL_SERVER_ERROR);
    }
};
hotel.getHotels = async (req, reply) => {
    try {
        const responseData = await hotelModel.getList();
        if(responseData){
            let response = commonResMsg.SUCCESS;
            responseData.forEach(element => {
                element.floors_count = element.meta.length; 
            });
            response["list"] =responseData;
            reply.send(response);
        }
        else
            reply.send(commonResMsg.FAILED);
    } catch (err) {
        console.log("err", err);
        reply.send(commonResMsg.INTERNAL_SERVER_ERROR);
    }
};
hotel.getHotelById = async (req, reply) => {
    try {
        let request = req.query;
        const responseData = await hotelModel.getListByHotelId(request.id);
        let res = responseData.reduce(function (r, a) {
            r[a.floor_no] = r[a.floor_no] || [];
            r[a.floor_no].push(a);
            return r;
        }, Object.create(null));
        let response = commonResMsg.SUCCESS;
        response.floor_count = Object.keys(res).length;
        response.list = res;
        reply.send(response)
    } catch (err) {
        console.log("err", err);
        reply.send(commonResMsg.INTERNAL_SERVER_ERROR);
    }
};
module.exports = hotel;
