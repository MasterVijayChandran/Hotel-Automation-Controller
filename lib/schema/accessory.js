"use strict";

let accessory = {};

accessory.accessoryReq = {
    type: "object",
    properties: {
      hotel_id: { type: "number" },
      corridor_id: { type: "number" },
      accessory_id: { type: "number" },
      is_on: { type: "boolean" },
    },
    required: ["hotel_id", "corridor_id","accessory_id","is_on"]
};

module.exports = accessory;