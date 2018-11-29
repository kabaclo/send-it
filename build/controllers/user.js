"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class User {
  constructor(options = {}) {
    const {
      username = '',
      usersModel = ''
    } = options;
    this.username = username;
    this.userList = usersModel;
  }

  auth(options = {}) {
    const response = {
      success: false
    };
    const {
      username = '',
      password = ''
    } = options;
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