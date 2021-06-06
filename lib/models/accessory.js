const knex = require("../config/db");
let hotel = {};
const TBL = 'testing.corridor_accessories'


hotel.update = (req,res) => {
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
// hotel.getList = data => {
//   return new Promise(async (resolve, reject) => {
//     try {
//     } catch (err) {
//       console.log("err", err);

//       reject(err);
//     }
//   });
// };
module.exports = hotel;