const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');  
const { Client } = require('pg');
const os = require ('os');
//initial app
const app = express();
const port=4000;

//connect to redis
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';

const redisClient = redis.createClient({ url: `redis://${REDIS_HOST}:${REDIS_PORT}` });
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('connected to redis...'));
redisClient.connect();

//postgres data base
const DB_USER = 'root';
const DB_PASSWORD = 'password';
const DB_PORT = 5432;
const DB_HOST = 'Postgres';


const URI= `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
const client = new Client({
  connectionString: URI,
});

client
  .connect()
  .then(() => console.log('connected to data base.....'))
  .catch((err) => console.log('failed to connect data base ......'));



//connect to mongo data base
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = 27017;
// const DB_HOST = 'mongo';


// const URI= `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

// mongoose
// .connect(URI)
// .then(() => console.log('connected to data base.....'))
// .catch((err) => console.log('failed to connect data base ......'));

app.get('/', (req, res) => {
  redisClient.set('products', 'products...');
  console.log(`traffic from ${os.hostname}`);
  res.send(('<h1>Welocme To Our First Dockerized Software after succsess</h1>'));
});

app.get('/app', async (req, res) => {
 const products = await redisClient.get('products');
  res.send((`<h1>Hello, World!,hello</h1> </h2>${products}</h2>`));
});

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});