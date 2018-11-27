"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class User {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const _options$username = options.username,
          username = _options$username === void 0 ? '' : _options$username,
          _options$usersModel = options.usersModel,
          usersModel = _options$usersModel === void 0 ? '' : _options$usersModel;
    this.username = username;
    this.userList = usersModel;
  }

  auth() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const response = {
      success: false
    };
    const _options$username2 = options.username,
          username = _options$username2 === void 0 ? '' : _options$username2,
          _options$password = options.password,
          password = _options$password === void 0 ? '' : _options$password;
    this.secret = _crypto.default.createHash('sha256').update(password).digest('hex');

    if (username) {
      this.username = username;
    }

    if (!this.username) {
      response.message = 'undefined user';
      return response;
    }

    const user = this.findByUsername();

    if (!user) {
      response.message = 'user doesn\'t exist';
      return response;
    }

    if (user.secret !== this.secret) {
      response.message = 'incorrect password';
      return response;
    }

    response.success = true;
    response.message = 'authorized user';
    response.data = user;
    return response;
  }

  findByUsername() {
    var _this = this;

    return this.userList.find(function (usr) {
      if (usr.username === _this.username) return usr;
    });
  }

}

exports.default = User;