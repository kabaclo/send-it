import { Pool } from 'pg';
import configObject from '../db/config';


export default class DBHelper {
  constructor() {
    this.client = new Pool(configObject);
  }

  async close() {
    try {
      this.connection.release();
      return true;
    } catch (error) {
      return false;
    }
  }

  async create(createQuery) {
    try {
      await this.query(createQuery);
      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async query(query = '', params = []) {
    try {
      console.warn('executing query');
      const connection = await this.client.connect();
      const queryResponse = await connection.query(query, params);
      // console.log(queryResponse);
      return queryResponse;
    } catch (error) {
      console.error('failed to execute: ', error);

      return error;
    }
  }
}
