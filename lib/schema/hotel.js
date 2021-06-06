let hotel = {};

hotel.floor = {
  type: "object",
  properties: {
    main_cor_count  :{ type: "number", default: 1 },
    main_cor_light_count: { type: "number", default: 1 },
    main_cor_ac_count: { type: "number", default: 1 },
    sub_cor_count: { type: "number", default: 2 },
    sub_cor_light_count: { type: "number", default: 1 },
    sub_cor_ac_count: { type: "number", default: 1 },
    ac_power_limit: { type: "number", default: 10 },
    light_power_limit: { type: "number", default: 5 },
    power_limit: { type: "number",default: 5},
    off_time_in_min: { type: "number",default: 1}
  }
};

hotel.hotelListReq = {
    type: "object",
    properties: {
      hotel_name: { type: "string" },
      sensor_activation_at: { type: "string", default:"18:00:00" },
      sensor_stopped_at: { type: "string", default:"06:00:00" },
      floors: { type: "array", items: hotel.floor }
    },
    required: ["hotel_name", "floors"]
};
hotel.hotelGetReq = {
  type: "object",
  properties: {
    id: { type: "number" }
  },
};

module.exports = hotel;