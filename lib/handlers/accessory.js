const commonResMsg = require("../responseMsg/common");
const accessoryModel = require("../models/accessory");
const corridorModel = require("../models/corridor");
const floorModel = require("../models/floor");
const moment = require('moment');


let accessory = {};
/**
 * @param {Number} power_needed 
 * @param {Array<{
 *  is_light: Boolean,
 *  accessory_id: Number,
 *  is_on: Boolean
 * }>} cooridor 
 * @param {Boolean} is_light 
 * @param {Number} power_collected 
 */
const power_collector = (power_needed, cooridor, is_light = false)=> {
    const update_accessories = cooridor.find(x=>x.is_light === is_light && x.is_on)
    if (update_accessories) update_accessories.off_time = moment().format("YYYY-MM-DD hh:mm:ss ")
    return {
        is_power_collected: !!update_accessories,
        update_accessories
    }
}

/** @params {
    "hotel_id": 12,
    "corridor_id": 14,
    "accessory_id": 5,
    "is_on": true
}
*/

accessory.update = async (req, reply) => {
    try {
        let request = req.body;
        let currentTime = moment().format('HH:MM:SS');
        
        const responseData = await accessoryModel.getById({floor_id:request.floor_id});
        const accessory = responseData.find(x => x.accessory_id === request.accessory_id)
        
        let process_time = (currentTime >= accessory.sensor_activation_at || currentTime <= accessory.sensor_stopped_at);
        if(process_time){
           if(request.is_on){
                if((accessory.occupied_power+accessory.power_conseption) > accessory.power_limit){
                    const sub_cooridor = responseData.filter(x=>!x.is_main_corridor && !x.is_light && x.is_on)
                    let sub_ac = sub_cooridor[0];
                    if(sub_ac){
                    let update_ac = {};
                    update_ac.is_on = false;
                    update_ac.off_time = moment().format("YYYY-MM-DD hh:mm:ss ");
                    update_ac.accessory_id = sub_ac.accessory_id;
                    let resonse = await accessoryModel.update(update_ac);
                    if(resonse){
                        let resonse = await accessoryModel.update({accessory_id:accessory.accessory_id,is_on:true});
                        if(resonse){
                            response = await floorModel.update({floor_id:accessory.floor_id,
                                occupied_power: (accessory.occupied_power+accessory.power_conseption-sub_ac.power_conseption)})
                            if(response){
                                response = commonResMsg.SUCCESS;
                                if(!accessory.is_main_corridor)
                                    response.off_time_in_min = accessory.off_time_in_min
                                reply.send(response)
                            }
                            else
                                reply.send(commonResMsg.FAILED)
                        }
                        else
                        reply.send(commonResMsg.FAILED)
                    }
                    else
                        reply.send(commonResMsg.INTERNAL_SERVER_ERROR)
                    }
                    else
                        reply.send(commonResMsg.UNABLE_TO_ON);
                }
                else{
                    let resonse = await accessoryModel.update({accessory_id:accessory.accessory_id,is_on:true});
                    if(resonse){
                        response = await floorModel.update({floor_id:accessory.floor_id,
                            occupied_power: (accessory.occupied_power+accessory.power_conseption)})
                        if(resonse){
                            response = commonResMsg.SUCCESS;
                            if(!accessory.is_main_corridor)
                                response.off_time_in_min = accessory.off_time_in_min
                            reply.send(response);
                        }
                        else
                            reply.send(commonResMsg.FAILED)
                    }
                    else
                        reply.send(commonResMsg.INTERNAL_SERVER_ERROR)
                }
            }
            else{
                let resonse = await accessoryModel.update({accessory_id:accessory.accessory_id,is_on:false});
                    if(resonse){
                        response = await floorModel.update({floor_id:accessory.floor_id,
                            occupied_power: (accessory.occupied_power-accessory.power_conseption)})
                        if(response){
                            const response_data = await accessoryModel.getById({floor_id:request.floor_id});
                            const sub_cooridor = response_data.filter(x=>(!x.is_main_corridor && !x.is_light && !x.is_on && x.off_time))
                            let sub_ac = sub_cooridor[0];
                            if(sub_ac &&(sub_ac.occupied_power+sub_ac.power_conseption) <= sub_ac.power_limit ){
                                response = await accessoryModel.getOffAc(accessory.floor_id);
                                if(response){
                                    await accessoryModel.update({accessory_id:response.accessory_id,is_on:true,off_time:null});
                                    response = await floorModel.update({floor_id:accessory.floor_id,
                                        occupied_power: (sub_ac.occupied_power+sub_ac.power_conseption)})
                                    if(response)
                                        reply.send(commonResMsg.SUCCESS)
                                    else
                                        reply.send(commonResMsg.INTERNAL_SERVER_ERROR)
                                }
                                else
                                    reply.send(commonResMsg.INTERNAL_SERVER_ERROR)
                            }
                        }
                        if(resonse){
                            response = commonResMsg.SUCCESS;
                            reply.send(response);
                        }
                        else
                            reply.send(commonResMsg.FAILED)
                    }
                    else
                        reply.send(commonResMsg.INTERNAL_SERVER_ERROR)
            }
            reply.send(responseData)
        }   
        else
            reply.send(commonResMsg.FAILED)
    } catch (err) {
        console.log("err", err);
        reply.send(commonResMsg.INTERNAL_SERVER_ERROR);
    }
};

module.exports = accessory;
