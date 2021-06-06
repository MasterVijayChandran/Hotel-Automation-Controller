const commonResMsg = require("../responseMsg/common");
const accessoryModel = require("../models/accessory");
const corridorModel = require("../models/corridor");
const moment = require('moment');


let accessory = {};
/*
* @params {
    "hotel_id": 12,
    "corridor_id": 14,
    "accessory_id": 5,
    "is_on": true
}
*/

accessory.update = async (req, reply) => {
    try {
        let request = req.body;
        console.log("here");
        let currentTime = moment().format('HH:MM:SS');
        currentTime = '05:00:00';
        
        const responseData = await accessoryModel.getById({accessory_id:request.accessory_id,floor_id:request.floor_id});
        console.log("re<<",responseData);
        let process_time = (currentTime >= responseData.sensor_activation_at || currentTime <= responseData.sensor_stopped_at)?true:false;
        if(process_time){
           if(request.is_on){
                if(responseData.is_main_corridor){
                    if(responseData.occupied_power+power_conseption > responseData.power_limit){
                        
                    }
                    const res = await accessoryModel.update(data);
                    if(res){
                            reply.send(commonResMsg.SUCCESS)
                        }
                    else
                        reply.send(commonResMsg.FAILED)
                    }
                else
                    reply.send(commonResMsg.FAILED)
            }
            reply.send(commonResMsg.FAILED)
        }   
        else
            reply.send(commonResMsg.NOT_PROCESS_TIME)  
        
        // let data= {}
        // data.is_on = request.is_on;
        // data.accessory_id = request.accessory_id;

        // const responseData = await accessoryModel.update(data);
        // if(responseData){
        //     const response = await corridorModel.getList(request.corridor_id);
        //     if(response){
        //         console.log("<<<<",response);
                
        //         let res = commonResMsg.SUCCESS;
        //             res.off_time_in_min = response[0].off_time_in_min
        //         reply.send(res)
        //     }
        //     else
        //         reply.send(commonResMsg.FAILED)
        // }
        // else
            reply.send(commonResMsg.FAILED)
    } catch (err) {
        console.log("err", err);
        reply.send(commonResMsg.INTERNAL_SERVER_ERROR);
    }
};

module.exports = accessory;
