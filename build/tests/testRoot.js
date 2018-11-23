"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
_chai.default.use(_chaiHttp.default);

describe('Root Test Suites', function () {
  it('should return 200(success) status', function (done) {
    _chai.default.request(_index.default).get('/').end(function (err, res) {
      _chai.default.expect(res.statusCode).to.be.equal(200);

      done();
    });
  });
});