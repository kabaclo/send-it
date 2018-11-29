"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("../controllers/user"));

var _USERS = _interopRequireDefault(require("../helpers/USERS"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const login = function (req, res, next) {
  const response = {
    code: 200,
    data: {}
  };

  try {
    const user = new _user.default({
      username: req.query.username,
      usersModel: _USERS.default.users
    });
    response.data = user.auth({
      password: req.query.password
    });

    if (!response.data.success) {
      return res.status(response.code).send(response);
    }

    next();
  } catch (error) {
    response.status = 500;
    response.data.error = error;
    return res.status(response.status).send(response.data);
  }
};

var _default = login;
exports.default = _default;