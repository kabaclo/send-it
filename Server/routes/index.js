import express from 'express';
import bodyParser from 'body-parser';
import login from '../middleware/login';
// import execute from '../db/database';
// import Users from '../Model/table';
import 'dotenv/config';
import {
  getParcels, getParcelById, getByParcelsUser, cancelParcelDelivery, createParcel,
} from '../middleware/parcels';
// import User from '../controllers/user';

const app = express();
const PORT = process.env.PORT || 3000;
const baseAPIURI = '/api/v1';

app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.status(200).send('Welcome to Clovis\' API');
});
app.use(login);


app.get(`${baseAPIURI}/parcels/$`, getParcels);
app.get(`${baseAPIURI}/parcels/:parcelId/$`, getParcelById);
app.get(`${baseAPIURI}/users/:userId/parcels`, getByParcelsUser);
app.put(`${baseAPIURI}/parcels/:parcelId/cancel`, cancelParcelDelivery);
app.post(`${baseAPIURI}/parcels/$`, createParcel);

// const users = new Users();
// users.create();


// execute(`CREATE TABLE IF NOT EXISTS Parcels (
// parcel_id int PRIMARY KEY,
// user_id int REFERENCES Users (user_id) ON DELETE CASCADE, 
// receiver varchar(50) NOT NULL,
// parcelDescription varchar(255) NOT NULL,
// origin varchar(50) NOT NULL,
// destination varchar(50) NOT NULL,
// current_location varchar(50) NOT NULL,
// weight_kg int,
// volume varchar(3),
// submission_date date,
// arrival_date date,
// status_parcel varchar(10));`);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

export default app;
