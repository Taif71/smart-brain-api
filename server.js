const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
    // host : '127.0.0.1', // if i change this to localhost it's gonna be the smae the 
  
  //   host: process.env.POSTGRES_HOST,
  //   user : process.env.POSTGRES_USER,
  //   password : process.env.POSTGRES_PASSWORD,
  //   database : process.env.POSTGRES_DB
  // }
  
});


const app = express();

// console.log('Hey man should work now');
// console.log('What about now?');

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send("It is working") })
// app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(8000, ()=> {
  console.log('app is running on port 8000');
})
