"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

// This connection to the database where got from the preboot camp training on database
const pool = new _pg.Pool();

const connect = async function connect() {
  return pool.connect();
};

const execute = async function execute(sql) {
  let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  const connection = await connect();

  try {
    return await connection.query(sql, data);
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

var _default = execute;
exports.default = _default;