const knex = require("../../config/db");
const TBL = 'testing.corridor';
const TBL2 = 'testing.floors';
let corridor = {};

corridor.getList = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      res = await knex.table(`${TBL}`)
        .leftJoin(`${TBL2}`, `${TBL}.floor_id`, `${TBL2}.floor_id`)
        .where('corridor_id',req);
        
      resolve(res);
    } catch (err) {
      console.log("err", err);
      reject(err);
    }
  });
};

module.exports = corridor;