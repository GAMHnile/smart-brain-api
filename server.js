const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controllers/signin.js');
const register= require('./controllers/register.js');
const profile= require('./controllers/profile.js');
const images= require('./controllers/images.js');

const app = express();

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  	ssl: true
  }
});



app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
	res.send('Server is online')
})

//queries(trx) should be returned to the knex object(db in this case) if need be..

app.post('/signin', (req, res)=>{signin.handleSignin(req, res, db, bcrypt)} );
app.post('/register', (req, res)=>{register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req, res, db)});
app.put('/images', (req, res)=> {images.handleImages(req, res, db)});
app.post('/imagesurl', (req, res)=>{images.handleClarifaiCall(req, res)});



app.listen(process.env.PORT, ()=> {
	console.log(`App is running at port ${process.env.PORT}`)
})

