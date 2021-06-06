const knex = require("../../config/db");
const TBL = 'testing.floors';
let floor = {};

floor.getList = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      res = await knex.select().table(`${TBL}`)
        .where('floor_id',req);
      resolve(res);
    } catch (err) {
      console.log("err", err);
      reject(err);
    }
  });
};
floor.update = (req, res) => {
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

module.exports = floor;