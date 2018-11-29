"use strict";

const DBHelper = require('./DBHelper'); // console.log(DBHelper);


const dbHelper = new DBHelper({
  database: 'database1'
});
const processResult = dbHelper.query('CREATE TABLE IF NOT EXISTS Users (user_id int NOT NULL, username varchar(20) NOT NULL, password varchar (20) NOT NULL, PRIMARY KEY (user_id) );');
console.log(processResult);