const commonResMsg = require("../responseMsg/common");
const accessoryModel = require("../models/accessory");
const corridorModel = require("../models/corridor");
const floorModel = require("../models/floor");
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
        const accessory = responseData.filter(x => x.accessory_id === request.accessory_id)[0]
        console.log(accessory);
        
        let process_time = (currentTime >= accessory.sensor_activation_at || currentTime <= accessory.sensor_stopped_at)?true:false;
        if(process_time){
           if(request.is_on){
                if(accessory.is_main_corridor){
                    if((accessory.occupied_power+accessory.power_conseption) > accessory.power_limit){
                        
                    }
                    else{
                        let resonse = await accessoryModel.update({accessory_id:accessory.accessory_id,is_on:true});
                        if(resonse){
                            response = await floorModel.update({floor_id:accessory.floor_id,
                                occupied_power: (accessory.occupied_power+accessory.power_conseption)})
                            if(resonse){
                                response = commonResMsg.SUCCESS;
                                // response.off_time_in_min = accessory.off_time_in_min
                                reply.send(response);
                            }
                            else
                                reply.send(commonResMsg.FAILED)
                        }
                        else
                            reply.send(commonResMsg.INTERNAL_SERVER_ERROR)

                            
                    }
                    
                    
                }
                else
                    reply.send(commonResMsg.FAILED)
            }
            else{

            }
            reply.send(responseData)
        }   
        else
            reply.send(responseData)  
        
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
