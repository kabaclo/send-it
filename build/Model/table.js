"use strict";

// import DBHelper from './Model';
const DBHelper = require('./Model');

class Users extends DBHelper {
  constructor() {
    super();
    this.createQuery = `CREATE TABLE IF NOT EXISTS Users (
        user_id int NOT NULL, 
        username varchar(20) NOT NULL, 
        password varchar (20) NOT NULL, 
        PRIMARY KEY (user_id) );`;
  }

  async create() {
    const createResult = await this.query({
      query: this.createQuery
    });

    if (!createResult) {
      return false;
    }

    return true;
  } // async get(options = {}) {
  //   }
  //   async delete(userId = null) {
  //   }
  //   async update(options = {}) {
  //   }


}

module.exports = Users;