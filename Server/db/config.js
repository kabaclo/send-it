import 'dotenv/config';
import url from 'url';

// eslint-disable-next-line import/no-mutable-exports
let configObject;
const environment = process.env.NODE_ENV;
if (environment === 'production') {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');
  configObject = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true,
  };
} else {
  const databaseenv = `PGDATABASE_${environment}`;
  const user = process.env.PGUSER;
  const host = process.env.PGHOST;
  const password = process.env.PGPASSWORD;
  const database = process.env[databaseenv];
  // process.env.PGDATABASE_TEST;
  const port = process.env.PGPORT;
  configObject = {
    user,
    host,
    password,
    database,
    port,

  };
}

// console.log(environment, '============', configObject);

export default configObject;
