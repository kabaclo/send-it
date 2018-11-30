"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _admin = _interopRequireDefault(require("../middleware/admin"));

var _user = require("../middleware/user");

require("dotenv/config");

var _parcels = require("../middleware/parcels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import login from '../middleware/login';
const app = (0, _express.default)();
const PORT = process.env.PORT || 5000;
const baseAPIURI = '/api/v1';
app.use(_bodyParser.default.json());
app.get('/', function (req, res) {
  res.status(200).send('Welcome to Clovis\' API');
});
app.get(`${baseAPIURI}/init-db/$`, _admin.default);
app.post(`${baseAPIURI}/auth/signUp`, _user.createUser);
app.post(`${baseAPIURI}/auth/login$`, _user.login);
app.use(_user.authenticatUser);
app.get(`${baseAPIURI}/parcels/$`, _parcels.getParcels);
app.get(`${baseAPIURI}/parcels/:parcelId/$`, _parcels.getParcelById);
app.get(`${baseAPIURI}/users/:userId/parcels`, _parcels.getByParcelsUser);
app.put(`${baseAPIURI}/parcels/:parcelId/status`, _parcels.cancelParcelDelivery);
app.put(`${baseAPIURI}/parcels/:parcelId/destination`, _parcels.changeDestination);
app.put(`${baseAPIURI}/parcels/:parcelId/presentLocation`, _parcels.changeCurrentLocation);
app.post(`${baseAPIURI}/parcels/$`, _parcels.createParcel);
app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});
var _default = app;
exports.default = _default;