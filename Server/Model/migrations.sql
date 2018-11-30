 DROP TABLE IF EXISTS Users;
 CREATE TABLE IF NOT EXISTS Users (
        userId SERIAL, 
        names VARCHAR(100) NOT NULL, 
        username varchar(40) NOT NULL UNIQUE, 
        email varchar(40) NOT NULL, 
        secret varchar (64) NOT NULL, 
        role varchar (16) NOT NULL);

 DROP TABLE IF EXISTS Parcels;
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
        status varchar(15) NOT NULL);