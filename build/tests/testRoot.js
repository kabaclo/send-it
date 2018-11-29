"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
_chai.default.should();

_chai.default.use(_chaiHttp.default);

describe('Root Test Suites', function () {
  it('should return 200 status', function (done) {
    _chai.default.request(_index.default).get('/').end(function (err, res) {
      _chai.default.expect(res.statusCode).to.be.equal(200);

      done();
    });
  });
});
describe(' GET parcels', function () {
  it('should return 200 status', function (done) {
    _chai.default.request(_index.default).get('/api/v1/parcels').end(function (err, res) {
      _chai.default.expect(res.statusCode).to.be.equal(200);

      res.body.should.be.a('object');
      done();
    });
  });
  it('should have a parcel having this format', function (done) {
    _chai.default.request(_index.default).get('/api/v1/parcels/?username=bajustone&password=123').end(function (err, res) {
      _chai.default.expect(res.statusCode).to.be.equal(200);

      res.body.should.be.a('object');
      res.body.should.have.property('parcels');
      res.body.parcels.should.be.a('array');
      res.body.parcels[0].should.have.property('sender').eql(1);
      res.body.parcels[0].should.have.property('parcelName').eql('courrier Justin');
      res.body.parcels[0].should.have.property('from').eql('Kigali');
      res.body.parcels[0].should.have.property('destination').eql('Nairobi');
      res.body.parcels[0].should.have.property('current_location').eql('kigali');
      res.body.parcels[0].should.have.property('weight').eql('12Kg');
      res.body.parcels[0].should.have.property('length').eql('45m');
      res.body.parcels[0].should.have.property('submission_date').eql('10/11/2018');
      res.body.parcels[0].should.have.property('arrival_date').eql('11/11/2018');
      res.body.parcels[0].should.have.property('status').eql('inTransit');
      done();
    });
  });
  it('should return all the parcels for a particular user', function (done) {
    _chai.default.request(_index.default).get('/api/v1/users/1/parcels/?username=bajustone&password=123').end(function (err, res) {
      _chai.default.expect(res.statusCode).to.be.equal(200);

      res.body.should.be.a('object');
      res.body.should.have.property('code');
      res.body.should.have.property('data');
      res.body.should.have.property('code').eql(200);
      res.body.data.should.be.a('object');
      res.body.data.should.have.property('success').eql(true);
      res.body.data.parcels.should.be.a('array');
      res.body.data.parcels[0].should.have.property('sender').eql(1);
      res.body.data.parcels[0].should.have.property('parcelName').eql('courrier Justin');
      res.body.data.parcels[0].should.have.property('from').eql('Kigali');
      res.body.data.parcels[0].should.have.property('destination').eql('Nairobi');
      res.body.data.parcels[0].should.have.property('current_location').eql('kigali');
      res.body.data.parcels[0].should.have.property('weight').eql('12Kg');
      res.body.data.parcels[0].should.have.property('length').eql('45m');
      res.body.data.parcels[0].should.have.property('submission_date').eql('10/11/2018');
      res.body.data.parcels[0].should.have.property('arrival_date').eql('11/11/2018');
      res.body.data.parcels[0].should.have.property('status').eql('inTransit');
      done();
    });
  });
  it('Should cancel a parcel', function (done) {
    _chai.default.request(_index.default).put('/api/v1/parcels/1/cancel/?username=bajustone&password=123').end(function (err, res) {
      // chai.expect(res.statusCode).to.be.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('code');
      res.body.should.have.property('data');
      res.body.should.have.property('code').eql(200);
      res.body.data.should.be.a('object');
      res.body.data.should.have.property('success').eql(true);
      res.body.data.should.have.property('message').eql('parcel canceled');
      res.body.data.parcel.should.be.a('object');
      done();
    });
  });
  it.only('Should create a parcel', function (done) {
    const data = {
      newParcel: {
        parcelId: 4,
        sender: 2,
        parcelName: 'courrier Justin',
        from: 'Kigali',
        destination: 'Nairobi',
        current_location: 'kigali',
        weight: '12Kg',
        length: '45m',
        submission_date: '10/11/2018',
        arrival_date: '11/11/2018',
        status: 'delivered'
      }
    };

    _chai.default.request(_index.default).post('/api/v1/parcels/?username=bajustone&password=123').send(data).end(function (err, res) {
      // chai.expect(res.body.code).to.be.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success').eql(true); // res.body.should.have.property('data');
      // res.body.should.have.property('success').eql(true);
      // res.body.should.have.property('code');
      // res.body.should.have.property('data');
      // res.body.should.have.property('code').eql(200);
      // res.body.data.should.be.a('object');
      // res.body.data.should.have.property('success').eql(true);
      // res.body.data.should.have.property('message').eql('parcel canceled');
      // res.body.data.parcel.should.be.a('object');

      done();
    });
  });
});