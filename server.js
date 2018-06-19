const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')

const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// process.env.PORT : for deploying on Heroku
const port = process.env.PORT || 5000

// DB Config
const db = require('./config/keys').mongoURI

//Connect to MongoDB
mongoose.connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err))

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

//Use routes
app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/profile', profile)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})