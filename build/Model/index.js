"use strict";

const DBHelper = require('./Model'); // console.log(DBHelper);


const dbHelper = new DBHelper({
  database: 'database1'
});

const processResult = function processResult(result) {
  //   const { rows } = result;
  console.log(result);
  dbHelper.close();
};

dbHelper.query({
  query: 'CREATE TABLE IF NOT EXISTS Users (user_id int NOT NULL, username varchar(20) NOT NULL, password varchar (20) NOT NULL, PRIMARY KEY (user_id) );',
  callback: processResult
});