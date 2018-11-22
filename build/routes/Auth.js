"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import bodyParser from 'body-parser';
const auth = _express.default.Router();

auth.get('/auth/', function (req, res) {
  res.send('hello, user!');
});
var _default = auth;
exports.default = _default;