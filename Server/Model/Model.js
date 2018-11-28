const { Pool } = require('pg');

class DBHelper {
  constructor(configrations = {}) {
    const {
      user = 'postgres',
      host = 'localhost',
      database = 'sendit',
      password = 'postgres',
      port = 5432,
    } = configrations;
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
      port: this.port,
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

  async query(options = {}) {
    const { query = '', params = [], callback = () => {} } = options;
    const queryResponse = await this.client.query(query, params);
    callback(queryResponse);
    return queryResponse;
  }
}
module.exports = DBHelper;
