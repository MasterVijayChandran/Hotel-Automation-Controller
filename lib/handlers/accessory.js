const commonResMsg = require("../responseMsg/common");
const accessoryModel = require("../models/accessory");
const corridorModel = require("../models/corridor");


let accessory = {};

accessory.update = async (req, reply) => {
    try {
        let request = req.body;
        let data= {}
        data.is_on = request.is_on;
        data.accessory_id = request.accessory_id;

        const responseData = await accessoryModel.update(data);
        if(responseData){
            const response = await corridorModel.getList(request.corridor_id);
            if(response){
                console.log("<<<<",response);
                
                let res = commonResMsg.SUCCESS;
                    res.off_time_in_min = response[0].off_time_in_min
                reply.send(res)
            }
            else
                reply.send(commonResMsg.FAILED)
        }
        else
            reply.send(commonResMsg.FAILED)
    } catch (err) {
        console.log("err", err);
        reply.send(commonResMsg.INTERNAL_SERVER_ERROR);
    }
};

module.exports = accessory;
