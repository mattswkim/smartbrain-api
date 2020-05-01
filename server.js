const express = require('express')
// Encrypt the password
const bcrypt = require('bcrypt-nodejs')
// Croo-Origin_Resouce_Sharing
const cors = require('cors')
// SQL query builder for JS
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
  }
});


const app = express()

app.use(cors())
app.use(express.json())

  
app.get('/', (req, res)=> { res.send('It is working!') })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})


app.listen(process.env.PORT || 3000, () => { 
  console.log(`app is running. port ${process.env.PORT}`)
})
