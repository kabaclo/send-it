import express from 'express';
import bodyParser from 'body-parser';
import login from '../middleware/login';
import {
  getParcels, getParcelById, getByParcelsUser, cancelParcelDelivery, createParcel,
} from '../middleware/parcels';

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

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
