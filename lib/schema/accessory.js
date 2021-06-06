"use strict";

let accessory = {};

accessory.accessoryReq = {
    type: "object",
    properties: {
      corridor_id: { type: "number" },
      accessory_id: { type: "number" },
      is_on: { type: "boolean" },
      floor_id: { type: "boolean" },
    },
    required: ["corridor_id","accessory_id","is_on","floor_id"]
};

module.exports = accessory;