# send-it
[![Build Status](https://travis-ci.org/kabaclo/send-it.svg?branch=server)](https://travis-ci.org/kabaclo/send-it)

SendIT is a courier service that helps users deliver parcels to different destinations. SendIT
provides courier quotes based on weight categories

## Requirements

* Node 8
* Git
* Contentful CLI (only for write access)

Without any changes, this app is connected to a Contentful space with read-only access. To experience the full end-to-end Contentful experience, you need to connect the app to a Contentful space with read _and_ write access. This enables you to see how content editing in the Contentful web app works and how content changes propagate to this app.

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/kabaclo/send-it/

```

```bash
npm install
```

## Steps for read-only access

To start the express server, run the following

```bash
npm run start-build
```

Open [http://localhost:3000](http://localhost:3000) and take a look around.


## Deploy to Heroku
You can also deploy this app to Heroku:
(https://git.heroku.com/kabandaapi.git)
