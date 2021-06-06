const knex = require("../../config/db");
let floor = {};
const TBL = 'testing.floor'

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