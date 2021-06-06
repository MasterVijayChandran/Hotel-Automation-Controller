const knex = require("../config/db");
let hotel = {};
const TBL = 'testing.hotel'

hotel.create = data => {
  return new Promise(async (resolve, reject) => {
    try {
      let hotel;
      knex.transaction(function(trx) {
        knex(`${TBL}`).transacting(trx).insert(data)
          .returning(['hotel_id','meta'], { includeTriggerModifications: true })
          .then(async (resp) => {
            hotel = resp[0];
            let corridor = hotel.meta, { hotel_id } = hotel;
            const corridors = [];
            const floors = corridor.map((x, floor_no)=> {
              return {
                hotel_id,
                floor_no,
                power_limit: x.power_limit
              }
            })
            let rows = await knex(`testing.floors`).transacting(trx).insert(floors)
              .returning(['floor_id','floor_no'], { includeTriggerModifications: true });
            for(const [floor_no, item] of corridor.entries()){
              const {floor_id} = rows.find(x=>x.floor_no===floor_no)
              for(let i=0; i < item.main_cor_count; i++) {
                corridors.push({
                  hotel_id,
                  floor_id,
                  is_main_corridor: true
                })
              }
              for(let i=0; i < item.sub_cor_count; i++) {
                corridors.push({
                  hotel_id,
                  floor_id,
                  is_main_corridor: false
                })
              }
            }
            let corridors_data = await knex(`testing.corridor`).transacting(trx).insert(corridors)
              .returning(['corridor_id','is_main_corridor','floor_id'], { includeTriggerModifications: true });
              console.log("third_ins",corridors_data);
              
            const corridors_accessories = []
            for (const item of corridors_data) {
              const _corridor = corridor[rows.find(x=>x.floor_id===item.floor_id).floor_no]
              const light_count = item.is_main_corridor
                  ? _corridor.main_cor_light_count
                  : _corridor.sub_cor_light_count,
                ac_count = item.is_main_corridor
                  ? _corridor.main_cor_ac_count
                  : _corridor.sub_cor_ac_count;
              for (let light_index=0; light_index<light_count;light_index++) {
                corridors_accessories.push({
                  power_conseption: _corridor.light_power_limit,
                  corridor_id: item.corridor_id,
                  is_light: true
                })
              }
              for (let ac_index=0; ac_index<ac_count;ac_index++) {
                corridors_accessories.push({
                  power_conseption: _corridor.ac_power_limit,
                  corridor_id: item.corridor_id,
                  is_light: false
                })
              }
            }
            let response = await knex(`testing.corridor_accessories`).transacting(trx).insert(corridors_accessories)
          })
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .then(function(resp) {
        console.log('Transaction complete.');
        resolve(hotel.hotel_id);
      })
      .catch(function(err) {
        console.error(err);
        reject(err);
      });
    } catch (err) {
      console.log("err", err);

      reject(err);
    }
  });
};
hotel.getList = (req,res) => {
  return new Promise(async (resolve, reject) => {
    try {
      res = await knex.select().table(`${TBL}`);
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