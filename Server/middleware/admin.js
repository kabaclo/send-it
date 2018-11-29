import User from '../Model/User';
import Parcel from '../Model/Parcel';

const initDB = async (req, res) => {
  // create user table
  await new User().createTable();
  await new Parcel().createTable();
  return res.status(200).send('ready');
};
export default initDB;
