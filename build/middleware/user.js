"use strict";

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controllers/user"));

var _USERS = _interopRequireDefault(require("../helpers/USERS"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const loginApp = (0, _express.default)();
loginApp.get('/:username/:password', function (req, res) {
  const response = {
    code: 200,
    data: {}
  };

  try {
    const user = new _user.default({
      username: req.params.username,
      userModel: _USERS.default.users
    });
    response.data = user.auth({
      password: req.params.password
    });
  } catch (error) {
    response.status = 500;
    response.data.error = error;
  }

  res.status(response.status).send(response.data);
});
module.exports = loginApp;