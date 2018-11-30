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
    const createQueryResult = await this.query(createQuery);
    return createQueryResult;
  }

  async query(query = '', params = []) {
    const connection = await this.client.connect();
    const queryResponse = await connection.query(query, params);
    return queryResponse;
  }
}
