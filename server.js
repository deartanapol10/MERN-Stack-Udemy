const express = require('express')
const mongoose = require('mongoose')

const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')

const app = express()

// process.env.PORT : for deploying on Heroku
const port = process.env.PORT || 5000

// DB Config
const db = require('./config/keys').mongoURI

//Connect to MongoDB
mongoose.connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello')
})

//Use routes
app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/profile', profile)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})