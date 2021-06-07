//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let serverUrl = require('../config/app').server
let baseUrl = `${serverUrl.host}:${serverUrl.port}`

chai.use(chaiHttp);

 /*
  * Test the /api/accessory/update route for on
  */
 describe('/api/accessory/update accessory', () => {
    let accessory_on = {
        "corridor_id": 2,
        "accessory_id": 3,
        "is_on": true,
        "floor_id":1
    }
    // if on correct time for main corridor
    it('it should UPDATE a main corridor accessory given accessory id if on correct time ', (done) => {
            chai.request(baseUrl)
            .put('/api/accessory/update')
            .send(accessory_on)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('statusCode');
                res.body.should.have.property('message');
                res.body.should.have.property('message').eql('Success');
            done();
        });
    });
    // if on wrong time for main corridor
    it('it should UPDATE a main corridor accessory given accessory id if on wrong time ', (done) => {
            chai.request(baseUrl)
            .put('/api/accessory/update')
            .send(accessory_on)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('statusCode');
                res.body.should.have.property('message');
                res.body.should.have.property('message').eql('Unable To ON at This Time');
            done();
        });
    });
    // if off correct time for sub corridor
    it('it should UPDATE a sub corridor accessory given accessory id if off correct time ', (done) => {
            chai.request(baseUrl)
            .put('/api/accessory/update')
            .send(accessory_on)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('statusCode');
                res.body.should.have.property('message');
                res.body.should.have.property('message').eql('Success');
                res.body.should.have.property('off_time_in_min').eql(1);
            done();
        });
    });
    // if on wrong time for sub corridor
    it('it should UPDATE a sub corridor accessory given accessory id if on wrong time ', (done) => {
            chai.request(baseUrl)
            .put('/api/accessory/update')
            .send(accessory_on)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('statusCode');
                res.body.should.have.property('message');
                res.body.should.have.property('message').eql('Unable To ON at This Time');
            done();
        });
    });
    let accessory_off = {
        "corridor_id": 2,
        "accessory_id": 3,
        "is_on": false,
        "floor_id":1
    }

    // if off correct time for main corridor
    it('it should UPDATE a main corridor accessory given accessory id if off correct time ', (done) => {
        chai.request(baseUrl)
        .put('/api/accessory/update')
        .send(accessory_off)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('statusCode');
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('Success');
            done();
        });
    });
    // if off wrong time for main corridor
    it('it should UPDATE a main corridor accessory given accessory id if off wrong time ', (done) => {
            chai.request(baseUrl)
            .put('/api/accessory/update')
            .send(accessory_off)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('statusCode');
                res.body.should.have.property('message');
                res.body.should.have.property('message').eql('Unable To ON at This Time');
            done();
        });
    });
    // if on correct time for sub corridor
    it('it should UPDATE a sub corridor accessory given accessory id if on correct time ', (done) => {
            chai.request(baseUrl)
            .put('/api/accessory/update')
            .send(accessory_off)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('statusCode');
                res.body.should.have.property('message');
                res.body.should.have.property('message').eql('Success');
            done();
        });
    });
    // if off wrong time for sub corridor
    it('it should UPDATE a sub corridor accessory given accessory id if off wrong time ', (done) => {
            chai.request(baseUrl)
            .put('/api/accessory/update')
            .send(accessory_off)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('statusCode');
                res.body.should.have.property('message');
                res.body.should.have.property('message').eql('Unable To ON at This Time');
            done();
        });
    });
});