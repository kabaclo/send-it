import 'dotenv/config';

const environment = process.env.NODE_ENV;
const databaseenv = `PGDATABASE_${environment}`;
const user = process.env.PGUSER;
const host = process.env.PGHOST;
const password = process.env.PGPASSWORD;
const database = process.env[databaseenv];
// process.env.PGDATABASE_TEST;
const port = process.env.PGPORT;



const configObject = {
  user,
  host,
  password,
  database,
  port,

};
console.log(environment, '============', configObject);

export default configObject;
