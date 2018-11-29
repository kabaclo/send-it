import DBHelper from './DBHelper';

export default class User extends DBHelper {
  constructor() {
    super();
    this.createQuery = `
        CREATE TABLE IF NOT EXISTS Users (
        userId SERIAL, 
        names VARCHAR(100) NOT NULL, 
        username varchar(40) NOT NULL UNIQUE, 
        email varchar(40) NOT NULL, 
        secret varchar (64) NOT NULL, 
        role varchar (16) NOT NULL);`;
  }

  async createTable() {
    this.create(this.createQuery);
  }
}
