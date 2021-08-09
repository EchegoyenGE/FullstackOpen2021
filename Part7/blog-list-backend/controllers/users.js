const bcrypt = require('bcrypt')
const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, likes: 1 })
    response.status(200).json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    const { body } = request

    if (body.username.length < 3) {
        return response.status(400).send({ error: 'username must exist and be equal or longer than 3' })
    }
    if (body.password.length < 3) {
        return response.status(400).send({ error: 'password must exist and be equal or longer than 2' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(200).json(savedUser.toJSON())
})

module.exports = usersRouter