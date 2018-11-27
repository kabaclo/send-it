"use strict";

const _require = require('pg'),
      Pool = _require.Pool;

class DBHelper {
  constructor() {
    let configrations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const _configrations$user = configrations.user,
          user = _configrations$user === void 0 ? 'postgres' : _configrations$user,
          _configrations$host = configrations.host,
          host = _configrations$host === void 0 ? 'localhost' : _configrations$host,
          _configrations$databa = configrations.database,
          database = _configrations$databa === void 0 ? 'sendit' : _configrations$databa,
          _configrations$passwo = configrations.password,
          password = _configrations$passwo === void 0 ? 'postgres' : _configrations$passwo,
          _configrations$port = configrations.port,
          port = _configrations$port === void 0 ? 5432 : _configrations$port;
    this.user = user;
    this.host = host;
    this.database = database;
    this.password = password;
    this.port = port;
    this.connect();
  }

  async connect() {
    this.client = new Pool({
      user: this.user,
      host: this.host,
      database: this.database,
      password: this.password,
      port: this.port
    });
  }

  async close() {
    try {
      this.client.end();
      return true;
    } catch (error) {
      return error;
    }
  }

  async query() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const _options$query = options.query,
          query = _options$query === void 0 ? '' : _options$query,
          _options$params = options.params,
          params = _options$params === void 0 ? {} : _options$params,
          _options$callback = options.callback,
          callback = _options$callback === void 0 ? function () {} : _options$callback;
    const queryResponse = await this.client.query(query);
    callback(queryResponse);
    return queryResponse;
  }

}

module.exports = DBHelper;