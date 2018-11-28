// This connection to the database where got from the preboot camp training on database
import { Pool } from 'pg';

const pool = new Pool();

const connect = async () => pool.connect();

const execute = async (sql, data = []) => {
  const connection = await connect();
  try {
    return await connection.query(sql, data);
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};


export default execute;
