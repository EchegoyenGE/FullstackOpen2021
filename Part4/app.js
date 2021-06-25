require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

console.log('connecting to database')

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => console.log('connected to MongoDB'))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app