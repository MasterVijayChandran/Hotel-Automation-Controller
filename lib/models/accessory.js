const knex = require("../config/db");
let accessory = {};
const TBL = 'testing.corridor_accessories';
const TBL2 = 'testing.corridor';
const TBL3 = 'testing.floors';
const TBL4 = 'testing.hotel';


accessory.update = (req,res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let accessory_id = req.accessory_id;
      delete req.accessory_id;
      res = await knex(`${TBL}`)
      .where('accessory_id',accessory_id)
      .update(req);
      
      resolve(res);
    } catch (err) {
      console.log("err", err);

      reject(err);
    }
  });
};
accessory.getById = (req,res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await knex.table(`${TBL}`)
        .leftJoin(`${TBL2}`, `${TBL}.corridor_id`, `${TBL2}.corridor_id`)
        .leftJoin(`${TBL3}`, `${TBL2}.floor_id`, `${TBL3}.floor_id`)
        .leftJoin(`${TBL4}`, `${TBL3}.hotel_id`, `${TBL4}.hotel_id`)
        .where(`${TBL3}.floor_id`,req.floor_id);
        res = response
        resolve(res);
    } catch (err) {
      console.log("err", err);

      reject(err);
    }
  });
};
// accessory.getById = data => {
//   return new Promise(async (resolve, reject) => {
//     try {
//     } catch (err) {
//       console.log("err", err);

//       reject(err);
//     }
//   });
// };
module.exports = accessory;