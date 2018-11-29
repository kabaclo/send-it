/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../routes/index';


chai.should();

chai.use(chaiHttp);

describe('Root Test Suites', () => {
  it('should return 200 status', (done) => {
    chai.request(app).get('/').end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
});

describe(' GET parcels', () => {
  it('should return 200 status', (done) => {
    chai.request(app).get('/api/v1/parcels').end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      res.body.should.be.a('object');

      done();
    });
  });

  it('should have a parcel having this format', (done) => {
    chai.request(app)
      .get('/api/v1/parcels/?username=bajustone&password=123')
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
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
  it('should return all the parcels for a particular user', (done) => {
    chai.request(app)
      .get('/api/v1/users/1/parcels/?username=bajustone&password=123')
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
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
  it('Should cancel a parcel', (done) => {
    chai.request(app)
      .put('/api/v1/parcels/1/cancel/?username=bajustone&password=123')
      .end((err, res) => {
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
  it.only('Should create a parcel', (done) => {
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
        status: 'delivered',
      },
    };
    chai.request(app)
      .post('/api/v1/parcels/?username=bajustone&password=123')
      .send(data)
      .end((err, res) => {
        // chai.expect(res.body.code).to.be.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        // res.body.should.have.property('data');
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
