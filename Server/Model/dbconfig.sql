CREATE DATABASE IF NOT EXISTS sendit;
CREATE TABLE IF NOT EXISTS Users (user_id int NOT NULL, username varchar(20) NOT NULL, password varchar (20) NOT NULL, PRIMARY KEY (user_id) );

-- CREATE TABLE parcels (parcel_id int NOT NULL, user_id , receiver varchar (50) NOT NULL, 
-- parcelDescription varchar (255) NOT NULL, origin varchar (50) NOT NULL, destination varchar (50) NOT NULL, 
-- current_location varchar(50) NOT NULL, weight_kg int(5), volume varchar (3), submission_date date, 
-- arrival_date date, status_parcel varchar(10), PRIMARY KEY (user_id), FOREIGN KEY (user_id) REFERENCES Users(user_id) );

