"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _login = _interopRequireDefault(require("../middleware/login"));

var _table = _interopRequireDefault(require("../Model/table"));

require("dotenv/config");

var _parcels = require("../middleware/parcels");

var _user = _interopRequireDefault(require("../controllers/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import execute from '../db/database';
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
app.post(`${baseAPIURI}/parcels/$`, _parcels.createParcel); // const users = new Users();
// users.create();
// execute(`CREATE TABLE IF NOT EXISTS Parcels (
// parcel_id int PRIMARY KEY, 
// user_id int REFERENCES Users (user_id) ON DELETE CASCADE, 
// receiver varchar(50) NOT NULL, 
// parcelDescription varchar(255) NOT NULL, 
// origin varchar(50) NOT NULL, 
// destination varchar(50) NOT NULL, 
// current_location varchar(50) NOT NULL,
// weight_kg int, 
// volume varchar(3),
// submission_date date, 
// arrival_date date, 
// status_parcel varchar(10));`);

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});
var _default = app;
exports.default = _default;