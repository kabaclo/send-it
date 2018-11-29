import DBHelper from './DBHelper';

export default class Parcel extends DBHelper {
  constructor() {
    super();
    this.createQuery = ` DROP TABLE IF EXISTS Parcels;
    CREATE TABLE IF NOT EXISTS Parcels (
        parcelId SERIAL,
        userId int, 
        receiver varchar(50) NOT NULL,
        parcelDescription varchar(255) NOT NULL,
        origin varchar(50) NOT NULL,
        destination varchar(50) NOT NULL,
        currentLocation varchar(50) NOT NULL,
        weightKg int,
        submissionDate date,
        arrivalDate date,
        status varchar(15) NOT NULL);`;
  }

  async createTable() {
    this.create(this.createQuery);
  }

  // async get(options = {}) {

  //   }

  //   async delete(userId = null) {

  //   }

  //   async update(options = {}) {


//   }
}
