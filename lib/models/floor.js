const knex = require("../../config/db");
let floor = {};
const TBL = 'testing.floors'

floor.getList = (req,res) => {
  return new Promise(async (resolve, reject) => {
    try {
      res = await knex.select().table(`${TBL}`)
        .where('floor_id',req);
        console.log("<<",res);
        
      resolve(res);
    } catch (err) {
      console.log("err", err);

      reject(err);
    }
  });
};
floor.update = (req,res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let floor_id = req.floor_id;
      delete req.floor_id;
      res = await knex(`${TBL}`)
      .where('floor_id',floor_id)
      .update(req);
      
      resolve(res);
    } catch (err) {
      console.log("err", err);

      reject(err);
    }
  });
};
// floor.getList = data => {
//   return new Promise(async (resolve, reject) => {
//     try {
//     } catch (err) {
//       console.log("err", err);

//       reject(err);
//     }
//   });
// };
module.exports = floor;