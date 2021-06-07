//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let serverUrl = require('../config/app').server
let baseUrl = `${serverUrl.host}:${serverUrl.port}`

chai.use(chaiHttp);


/*
* Test the /api/hotel/getList route
*/
describe('/api/hotel/getList all Hotel', () => {
    it('it should GET all the Hotel', (done) => {
        chai.request(baseUrl)
            .get('/api/hotel/getList')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('statusCode');
                res.body.should.have.property('message');
                res.body.should.have.property('list').with.length.of.at.least(1);
                res.body.list.forEach(item => {
                    item.should.have.property('hotel_id')
                    item.should.have.property('floors_count')
                    item.should.have.property('sensor_activation_at')
                    item.should.have.property('sensor_stopped_at')
                });
            done();
            });
    });
});


/*
* Test the /api/hotel/getList/:id route
*/
describe('/api/hotel/getHotelById/:id Hotel', () => {
    let id = 1;
    it('it should GET a Hotel by the given id', (done) => {
        chai.request(baseUrl)
        .get('/api/hotel/getHotelById?id='+id)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('statusCode');
            res.body.should.have.property('message');
            res.body.should.have.property('list');
            res.body.should.have.property('floor_count');
        done();
        });
    });
    //negative scenario
    it('it should not GET a Hotel by the given id', (done) => {
        chai.request(baseUrl)
        .get('/api/hotel/getHotelById?id='+id)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('statusCode');
            res.body.should.have.property('message');
            res.body.should.have.property('list');
            res.body.should.have.property('floor_count').with.equals(0);
        done();
        });
    });
});
/*
* Test the /api/hotel/create route
*/
// describe('/api/hotel/create hotel', () => {
//     it('it should not POST a hotel without pages field', (done) => {
//         let hotel = {
//             "hotel_name":"testing",
//             "floors":[
//                 {
//                     "main_cor_count":1,
//                     "main_cor_light_count":1,
//                     "main_cor_ac_count":1,
//                     "sub_cor_count":2,
//                     "sub_cor_light_count":1,
//                     "sub_cor_ac_count":1,
//                     "power_limit":35,
//                     "ac_power_limit":10,
//                     "light_power_limit":10,
//                     "off_time_in_min":1
//                 },
//                 {
//                     "main_cor_count":1,
//                     "main_cor_light_count":2,
//                     "main_cor_ac_count":2,
//                     "sub_cor_count":1,
//                     "sub_cor_light_count":2,
//                     "sub_cor_ac_count":2,
//                     "power_limit":35,
//                     "ac_power_limit":10,
//                     "off_time_in_min":1
//                 }
//             ],
//             "sensor_activation_at":"18:00:00",
//             "sensor_stopped_at":"06:00:00"
//         }
//           chai.request(baseUrl)
//           .post('/api/hotel/create')
//           .send(hotel)
//           .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('statusCode');
//                 res.body.should.have.property('message');
//             done();
//           });
//     });
// });

