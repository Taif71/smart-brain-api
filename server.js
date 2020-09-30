const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const port = process.env.PORT || 5000;


const isDev = (process.env.NODE_ENV === 'dev');
const db = knex({
  client: 'pg',
  connection: {
    host : !isDev ? process.env.PG_HOST : '127.0.0.1',
    user : !isDev ? process.env.PG_USER : '',
    password : !isDev ? process.env.PG_PASSWORD: '',
    database : !isDev ? process.env.PG_DATABASE : 'smart-brain',
    ssl: !isDev ? true : false
  }
});

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// const db = knex({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

// app.listen(process.env.PORT || 8000, () => {
//   console.log(`app is running on port ${process.env.PORT}`);
// });

app.listen(port, () => {
  console.log(`app is running on port ${port}`)
  console.log(`app is running on ${process.env.NODE_ENV} mode`)
})