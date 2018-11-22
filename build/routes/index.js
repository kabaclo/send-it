"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _login = _interopRequireDefault(require("../middleware/login"));

var _parcels = require("../middleware/parcels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const PORT = process.env.PORT || 3000;
const baseAPIURI = '/api/v1';
app.use(_bodyParser.default.json());
app.get('/', function (req, res) {
  res.status(200).send('Welcome to Clovis\' API');
});
app.use(_login.default);
app.get(`${baseAPIURI}/parcels/$`, _parcels.getParcels);
app.get(`${baseAPIURI}/parcels/:parcelId/$`, _parcels.getParcelById);
app.get(`${baseAPIURI}/users/:userId/parcels`, _parcels.getByParcelsUser);
app.put(`${baseAPIURI}/parcels/:parcelId/cancel`, _parcels.cancelParcelDelivery);
app.post(`${baseAPIURI}/parcels/$`, _parcels.createParcel);
app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});