"use strict";

let hotel = {};

hotel.hotelListReq = {
    type: "object",
    properties: {
      hotel_name: { type: "string" },
      sensor_activation_at: { type: "string", default:"18:00:00" },
      floors: { type: "array", items: hotel.floor }
    },
    required: ["hotel_name", "floors"]
};

hotel.floor = {
  type: "object",
  properties: {
    main_cor_count:{ type: "number", default: 1 },
    main_cor_light_count:{ type: "number", default: 1 },
    main_cor_ac_count:{ type: "number", default: 1 },
    sub_cor_count:{ type: "number", default: 2 },
    sub_cor_light_count:{ type: "number", default: 1 },
    sub_cor_ac_count:{ type: "number", default: 1 },
    ac_power_limit:{ type: "number", default: 10 },
    light_power_limit:{ type: "number", default: 5 },
    power_limit:{ type: "number", default: 5 }
  },
  required:["power_limit"]
};

module.exports = hotel;