const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('express-async-errors')
const cors = require('cors')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const resetRouter = require('./controllers/reset')
const commentsRouter = require('./controllers/comments')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info('connecting to MongoDB')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => logger.info('connected to MongoDB'))
    .catch((error) => { logger.error('error connection to MongoDB: ', error.message) })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.get('/', (request, response) => {
    response.status(200).send('<h1>Hello world!</h1>')
})

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/testing/reset', resetRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app